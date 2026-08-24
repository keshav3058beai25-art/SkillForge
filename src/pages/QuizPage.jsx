import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesData, getCourseById } from '../data/coursesData';
import { mcqDatabase, getMCQsByCourseId } from '../data/mcqData';
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css';

/**
 * QuizPage Component
 * 
 * Interactive Multiple-Choice Testing & Assessment System:
 * 1. 10-15 topic-specific questions per subject track
 * 2. Real-time question navigation palette with answered/flagged indicators
 * 3. Question countdown / elapsed stopwatch timer
 * 4. Submission calculation: score, percentage, mastery grade
 * 5. Full Post-Quiz Answer Key: Displays all correct answers highlighted in green,
 *    user choices, and in-depth conceptual explanations.
 * 6. LocalStorage persistence for quiz scores.
 */
function QuizPage({ onQuizComplete, onCompleteCourseLessons }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Determine active course ID from URL param or default to Course 1 (JavaScript)
  const initialCourseId = id ? Number(id) : 1;
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);

  // Sync state if URL param changes
  useEffect(() => {
    if (id) {
      const numeric = Number(id);
      if (mcqDatabase[numeric]) {
        setSelectedCourseId(numeric);
        resetQuizState();
      }
    }
  }, [id]);

  // Current active course data and questions
  const currentCourse = useMemo(() => getCourseById(selectedCourseId) || coursesData[0], [selectedCourseId]);
  const questions = useMemo(() => getMCQsByCourseId(selectedCourseId), [selectedCourseId]);

  // Quiz active state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState([]); // [questionId]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsFilter, setResultsFilter] = useState('all'); // 'all' | 'incorrect' | 'correct'
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isSubmitted]);

  // Format seconds into MM:SS
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reset quiz state helper
  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setIsSubmitted(false);
    setResultsFilter('all');
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  // Switch subject track
  const handleSelectSubject = (courseId) => {
    if (courseId !== selectedCourseId) {
      setSelectedCourseId(courseId);
      navigate(`/quiz/${courseId}`);
      resetQuizState();
    }
  };

  // Answer selection handler
  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Clear answer for current question
  const handleClearAnswer = (questionId) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  // Toggle flag for review
  const handleToggleFlag = (questionId) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((qId) => qId !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  // Current active question
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Submit Quiz Handler
  const handleSubmitQuiz = () => {
    const unansweredCount = totalQuestions - answeredCount;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit the quiz and view all correct answers?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setIsTimerRunning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const scorePercentage = Math.round((score / totalQuestions) * 100);

    // Save score in localStorage
    try {
      const existingScores = JSON.parse(localStorage.getItem('skillforge_quiz_scores') || '{}');
      const updatedScores = {
        ...existingScores,
        [selectedCourseId]: {
          courseId: selectedCourseId,
          courseTitle: currentCourse.title,
          score,
          totalQuestions,
          percentage: scorePercentage,
          timeSpentSec: timerSeconds,
          completedAt: new Date().toISOString()
        }
      };
      localStorage.setItem('skillforge_quiz_scores', JSON.stringify(updatedScores));

      if (onQuizComplete) {
        onQuizComplete(updatedScores);
      }

      // Automatically complete all topics for this subject upon taking the 7 MCQs!
      if (onCompleteCourseLessons) {
        onCompleteCourseLessons(selectedCourseId);
      }
    } catch (err) {
      console.error('Error saving quiz score to localStorage:', err);
    }
  };

  // Scoring statistics for results review
  const scoreStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unanswered += 1;
      } else if (ans === q.correctAnswer) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    let grade = 'Needs Practice';
    let gradeColor = 'grade-danger';
    let gradeBadge = '💡 Needs Revision';

    if (percentage >= 85) {
      grade = 'Mastery Achieved';
      gradeColor = 'grade-success';
      gradeBadge = '🏆 Excellent Mastery';
    } else if (percentage >= 60) {
      grade = 'Good Performance';
      gradeColor = 'grade-warning';
      gradeBadge = '👍 Good Knowledge';
    }

    return {
      correct,
      incorrect,
      unanswered,
      total: totalQuestions,
      percentage,
      grade,
      gradeColor,
      gradeBadge
    };
  }, [questions, userAnswers, totalQuestions]);

  // Filtered review questions
  const filteredReviewQuestions = useMemo(() => {
    if (resultsFilter === 'correct') {
      return questions.filter((q) => userAnswers[q.id] === q.correctAnswer);
    }
    if (resultsFilter === 'incorrect') {
      return questions.filter(
        (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer
      );
    }
    return questions; // 'all'
  }, [questions, userAnswers, resultsFilter]);

  return (
    <div className="quiz-page page-container">
      {/* Page Breadcrumbs */}
      <div className="quiz-breadcrumb">
        <Link to="/courses" className="breadcrumb-link">
          &larr; All Courses
        </Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/courses/${selectedCourseId}`} className="breadcrumb-link">
          {currentCourse.title}
        </Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">🎯 Subject MCQs & Practice</span>
      </div>

      {/* Subject Tabs Selector */}
      <section className="subject-selector-bar">
        <div className="subject-selector-header">
          <span className="selector-label">Select Subject Track:</span>
        </div>
        <div className="subject-pills-scroll">
          {coursesData.map((c) => {
            const isSelected = c.id === selectedCourseId;
            const courseMCQCount = (mcqDatabase[c.id] || []).length;

            return (
              <button
                key={c.id}
                type="button"
                className={`subject-pill-btn ${isSelected ? 'active-subject' : ''}`}
                onClick={() => handleSelectSubject(c.id)}
              >
                <span className="pill-title">{c.title}</span>
                <span className="pill-count">{courseMCQCount} MCQs</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          VIEW 1: ACTIVE QUIZ EXAM RUNNER
          ========================================================================= */}
      {!isSubmitted ? (
        <div className="quiz-active-container">
          {/* Header Bar: Topic info & Timer */}
          <div className="quiz-status-header">
            <div className="quiz-track-info">
              <span className="badge-course-cat">{currentCourse.category}</span>
              <h1 className="quiz-main-heading">{currentCourse.title} - 7 MCQs</h1>
              <p className="quiz-subheading">
                Answer all 7 curriculum questions. Submitting with correct answers unlocks and completes all topic progress for this subject!
              </p>
            </div>

            <div className="quiz-metrics-box">
              <div className="timer-badge">
                <span className="timer-icon">⏱️</span>
                <div>
                  <span className="timer-label">Time Elapsed</span>
                  <strong className="timer-value">{formatTime(timerSeconds)}</strong>
                </div>
              </div>

              <div className="progress-mini-card">
                <div className="mini-progress-label">
                  <span>Answered</span>
                  <strong>
                    {answeredCount} / {totalQuestions}
                  </strong>
                </div>
                <ProgressBar value={progressPercent} height="6px" showLabel={false} />
              </div>
            </div>
          </div>

          {/* Main Quiz Layout: Question Card on Left, Palette on Right */}
          <div className="quiz-main-grid">
            {/* Left Column: Interactive Question Box */}
            <div className="question-display-card">
              <div className="question-card-top">
                <div className="question-meta-tags">
                  <span className="q-number-pill">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="q-topic-pill">Topic: {currentQuestion.topic}</span>
                </div>

                <button
                  type="button"
                  className={`btn-flag-toggle ${
                    flaggedQuestions.includes(currentQuestion.id) ? 'is-flagged' : ''
                  }`}
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                  title="Flag this question to review before submitting"
                >
                  {flaggedQuestions.includes(currentQuestion.id) ? '🚩 Flagged' : '🏳️ Flag Question'}
                </button>
              </div>

              {/* Question Text */}
              <h2 className="question-stem-text">{currentQuestion.question}</h2>

              {/* Optional Code Snippet */}
              {currentQuestion.code && (
                <div className="question-code-block">
                  <pre>
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}

              {/* Options List */}
              <div className="options-container" role="radiogroup" aria-label="Multiple Choice Options">
                {currentQuestion.options.map((optionText, optIndex) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIndex;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <div
                      key={optIndex}
                      className={`option-choice-item ${isSelected ? 'option-selected' : ''}`}
                      onClick={() => handleSelectOption(currentQuestion.id, optIndex)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSelectOption(currentQuestion.id, optIndex);
                        }
                      }}
                    >
                      <span className="option-letter">{optionLetters[optIndex]}</span>
                      <span className="option-text">{optionText}</span>
                      <div className="option-radio-circle">
                        {isSelected && <div className="radio-inner-dot"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Question Controls & Navigation Footer */}
              <div className="question-card-footer">
                <div className="footer-left-actions">
                  <button
                    type="button"
                    className="btn-quiz-nav"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  >
                    &larr; Previous
                  </button>

                  {userAnswers[currentQuestion.id] !== undefined && (
                    <button
                      type="button"
                      className="btn-clear-choice"
                      onClick={() => handleClearAnswer(currentQuestion.id)}
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="footer-right-actions">
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      className="btn-quiz-nav btn-next-primary"
                      onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
                      }
                    >
                      Next &rarr;
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-submit-exam"
                      onClick={handleSubmitQuiz}
                    >
                      ✅ Submit Quiz & View Answers
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Question Navigator Palette */}
            <aside className="quiz-palette-sidebar">
              <div className="palette-card">
                <h3 className="palette-title">Question Navigator</h3>
                <p className="palette-hint">Click any number to jump directly to that question.</p>

                {/* Palette Bubbles Grid */}
                <div className="palette-grid">
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = idx === currentQuestionIndex;
                    const isFlagged = flaggedQuestions.includes(q.id);

                    let itemClass = 'palette-bubble';
                    if (isCurrent) itemClass += ' bubble-current';
                    if (isAnswered) itemClass += ' bubble-answered';
                    if (isFlagged) itemClass += ' bubble-flagged';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        className={itemClass}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}${
                          isFlagged ? ' (Flagged)' : ''
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && <span className="bubble-flag-dot">🚩</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Palette Legend */}
                <div className="palette-legend">
                  <div className="legend-item">
                    <span className="legend-sample sample-answered"></span>
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-sample sample-unanswered"></span>
                    <span>Unanswered ({totalQuestions - answeredCount})</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-sample sample-flagged"></span>
                    <span>Flagged ({flaggedQuestions.length})</span>
                  </div>
                </div>

                {/* Submit Quiz Action Button in Sidebar */}
                <div className="sidebar-submit-box">
                  <button
                    type="button"
                    className="btn-sidebar-submit"
                    onClick={handleSubmitQuiz}
                  >
                    Submit Quiz ({answeredCount}/{totalQuestions})
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        /* =========================================================================
            VIEW 2: POST-COMPLETION RESULTS & ALL CORRECT ANSWERS REVIEW
            ========================================================================= */
        <div className="quiz-results-container">
          {/* Results Summary Banner */}
          <section className="results-summary-card">
            <div className="results-header-row">
              <div>
                <span className="results-badge-tag">🎯 Test Completed</span>
                <h1 className="results-title">{currentCourse.title} - Score Report</h1>
                <p className="results-subtitle">
                  Review your performance breakdown below. All correct answers are highlighted with pedagogical explanations for comprehensive revision.
                </p>
                <div className="results-topics-completed-banner">
                  <span className="banner-check-icon">🎉</span>
                  <div>
                    <strong>Topic Progress Completed!</strong>
                    <p>All {currentCourse.lessons.length} curriculum topics for <em>{currentCourse.title}</em> have been marked completed in your progress dashboard.</p>
                  </div>
                </div>
              </div>

              {/* Big Score Gauge / Circle */}
              <div className={`score-circle-badge ${scoreStats.gradeColor}`}>
                <div className="score-circle-inner">
                  <span className="score-big-number">{scoreStats.percentage}%</span>
                  <span className="score-fraction">
                    {scoreStats.correct} / {scoreStats.total} Correct
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="results-stats-row">
              <div className="result-stat-pill">
                <span className="stat-pill-icon">✅</span>
                <div>
                  <span className="stat-pill-label">Correct Answers</span>
                  <strong className="stat-pill-value text-success">{scoreStats.correct}</strong>
                </div>
              </div>

              <div className="result-stat-pill">
                <span className="stat-pill-icon">❌</span>
                <div>
                  <span className="stat-pill-label">Incorrect Answers</span>
                  <strong className="stat-pill-value text-danger">{scoreStats.incorrect}</strong>
                </div>
              </div>

              <div className="result-stat-pill">
                <span className="stat-pill-icon">⚠️</span>
                <div>
                  <span className="stat-pill-label">Unanswered</span>
                  <strong className="stat-pill-value text-muted">{scoreStats.unanswered}</strong>
                </div>
              </div>

              <div className="result-stat-pill">
                <span className="stat-pill-icon">⏱️</span>
                <div>
                  <span className="stat-pill-label">Time Taken</span>
                  <strong className="stat-pill-value">{formatTime(timerSeconds)}</strong>
                </div>
              </div>

              <div className="result-stat-pill">
                <span className="stat-pill-icon">🏅</span>
                <div>
                  <span className="stat-pill-label">Mastery Status</span>
                  <strong className="stat-pill-value">{scoreStats.gradeBadge}</strong>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="results-action-buttons">
              <button
                type="button"
                className="btn-action-primary"
                onClick={resetQuizState}
              >
                🔁 Retake This Quiz
              </button>

              <Link
                to={`/notes?course=${encodeURIComponent(currentCourse.title)}`}
                className="btn-action-secondary"
              >
                📝 Add Notes on Weak Topics
              </Link>

              <Link
                to="/progress"
                className="btn-action-secondary"
              >
                📊 View All Quiz Analytics
              </Link>

              <Link
                to={`/courses/${selectedCourseId}`}
                className="btn-action-ghost"
              >
                📚 Course Syllabus
              </Link>
            </div>
          </section>

          {/* Detailed All Correct Answers Review Section */}
          <section className="answers-review-section">
            <div className="review-section-header">
              <div>
                <h2 className="review-heading">
                  📖 Complete Answer Key & In-Depth Explanations
                </h2>
                <p className="review-subheading">
                  Every question from this subject is shown with the correct option highlighted in green, your selected answer, and detailed conceptual rationale.
                </p>
              </div>

              {/* Filter Tabs: All / Incorrect / Correct */}
              <div className="review-filter-tabs">
                <button
                  type="button"
                  className={`filter-tab-btn ${resultsFilter === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setResultsFilter('all')}
                >
                  All Questions ({questions.length})
                </button>
                <button
                  type="button"
                  className={`filter-tab-btn ${resultsFilter === 'incorrect' ? 'active-filter' : ''}`}
                  onClick={() => setResultsFilter('incorrect')}
                >
                  ❌ Incorrect Only ({scoreStats.incorrect})
                </button>
                <button
                  type="button"
                  className={`filter-tab-btn ${resultsFilter === 'correct' ? 'active-filter' : ''}`}
                  onClick={() => setResultsFilter('correct')}
                >
                  ✅ Correct Only ({scoreStats.correct})
                </button>
              </div>
            </div>

            {/* Questions Review List */}
            <div className="review-cards-list">
              {filteredReviewQuestions.map((q, idx) => {
                const userSelectedOption = userAnswers[q.id];
                const isCorrect = userSelectedOption === q.correctAnswer;
                const isUnanswered = userSelectedOption === undefined;
                const optionLetters = ['A', 'B', 'C', 'D'];

                // Original index in the full questions list
                const originalIndex = questions.findIndex((item) => item.id === q.id);

                return (
                  <article
                    key={q.id}
                    className={`review-question-card ${
                      isCorrect ? 'card-status-correct' : isUnanswered ? 'card-status-unanswered' : 'card-status-incorrect'
                    }`}
                  >
                    {/* Review Card Header */}
                    <div className="review-card-top">
                      <div className="review-tags-row">
                        <span className="review-q-index">Question {originalIndex + 1}</span>
                        <span className="review-topic-tag">Topic: {q.topic}</span>
                      </div>

                      <div className="review-status-indicator">
                        {isCorrect && (
                          <span className="status-pill-badge badge-correct">
                            ✅ Correct (+1)
                          </span>
                        )}
                        {!isCorrect && !isUnanswered && (
                          <span className="status-pill-badge badge-incorrect">
                            ❌ Incorrect (Selected: {optionLetters[userSelectedOption]})
                          </span>
                        )}
                        {isUnanswered && (
                          <span className="status-pill-badge badge-unanswered">
                            ⚠️ Not Answered
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Text */}
                    <h3 className="review-question-text">{q.question}</h3>

                    {/* Optional Code Block */}
                    {q.code && (
                      <div className="question-code-block review-code">
                        <pre>
                          <code>{q.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Options Review List with Correct Answer Highlighted in Green */}
                    <div className="review-options-list">
                      {q.options.map((optText, optIdx) => {
                        const isThisCorrect = optIdx === q.correctAnswer;
                        const isThisUserChoice = optIdx === userSelectedOption;

                        let optClass = 'review-option-item';
                        if (isThisCorrect) {
                          optClass += ' option-correct-highlight';
                        } else if (isThisUserChoice && !isThisCorrect) {
                          optClass += ' option-wrong-highlight';
                        } else {
                          optClass += ' option-neutral';
                        }

                        return (
                          <div key={optIdx} className={optClass}>
                            <div className="review-opt-left">
                              <span className="review-opt-letter">{optionLetters[optIdx]}</span>
                              <span className="review-opt-text">{optText}</span>
                            </div>

                            <div className="review-opt-badge-col">
                              {isThisCorrect && (
                                <span className="badge-correct-answer">
                                  ✅ Correct Answer
                                </span>
                              )}
                              {isThisUserChoice && !isThisCorrect && (
                                <span className="badge-your-wrong-choice">
                                  ❌ Your Answer
                                </span>
                              )}
                              {isThisUserChoice && isThisCorrect && (
                                <span className="badge-your-correct-choice">
                                  🎯 Your Choice (Correct)
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Pedagogical Explanation Box */}
                    <div className="explanation-box">
                      <div className="explanation-header">
                        <span className="explanation-icon">💡</span>
                        <strong className="explanation-title">Explanation & Key Takeaway:</strong>
                      </div>
                      <p className="explanation-text">{q.explanation}</p>
                    </div>
                  </article>
                );
              })}

              {filteredReviewQuestions.length === 0 && (
                <div className="empty-filter-state">
                  <span>🎉</span>
                  <h4>No questions in this filter view.</h4>
                  <p>You got all questions right or there are no items matching this filter.</p>
                  <button
                    type="button"
                    className="btn-action-secondary"
                    onClick={() => setResultsFilter('all')}
                  >
                    View All Questions
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
