import React from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { mcqDatabase } from '../data/mcqData';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import './Progress.css';

/**
 * Progress Page Component
 * Demonstrates:
 * 1. useContext via useApp() to read completedLessons, quizScores, enrolledCourses, and handlers
 * 2. Array methods (reduce, filter, map) for analytical calculations
 * 3. Conditional rendering of progress milestones, quiz badges and achievements
 * 4. Confirmation-gated state reset handler
 * 5. My Learning section showing enrolled courses with Continue Learning
 */
function Progress() {
  // Read all needed values from global context (no props needed)
  const { completedLessons, quizScores, enrolledCourses, handleResetProgress } = useApp();
  // Total lessons across all courses
  const totalLessons = coursesData.reduce(
    (acc, course) => acc + course.lessons.length,
    0
  );

  const completedCount = completedLessons.length;
  const overallPercentage = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  // Fully completed courses count
  const completedCoursesCount = coursesData.filter((course) => {
    return course.lessons.every((lesson) => completedLessons.includes(lesson.id));
  }).length;

  // Quiz statistics
  const quizEntries = Object.values(quizScores);
  const totalQuizzesTaken = quizEntries.length;
  const averageQuizAccuracy = totalQuizzesTaken > 0
    ? Math.round(quizEntries.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzesTaken)
    : 0;

  const totalMasteredQuizzes = quizEntries.filter((q) => q.percentage >= 85).length;

  // Enrolled courses data for My Learning section
  const enrolledCoursesData = coursesData.filter((c) =>
    enrolledCourses.includes(c.id)
  );

  // Find the next incomplete lesson for a given course
  const getNextLesson = (course) => {
    const nextLesson = course.lessons.find(
      (lesson) => !completedLessons.includes(lesson.id)
    );
    return nextLesson || null;
  };

  return (
    <div className="progress-page page-container">
      {/* Header */}
      <header className="page-header">
        <span className="page-tag">📊 Learning Analytics</span>
        <h1 className="page-title">My Progress Dashboard</h1>
        <p className="page-subtitle">
          Track your overall curriculum progress, monitor completed lessons, quiz accuracy, and earn learning milestones.
        </p>
      </header>

      {/* Main Stats Cards Grid */}
      <section className="analytics-summary-grid">
        <div className="analytics-card card-primary">
          <div className="analytics-icon">🎯</div>
          <div>
            <span className="analytics-label">Curriculum Completion</span>
            <h2 className="analytics-value">{overallPercentage}%</h2>
          </div>
          <div className="analytics-progress-wrapper">
            <ProgressBar value={overallPercentage} showLabel={false} height="10px" />
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">✅</div>
          <div>
            <span className="analytics-label">Completed Lessons</span>
            <h2 className="analytics-value">
              {completedCount} <span className="analytics-sub">/ {totalLessons}</span>
            </h2>
          </div>
          <p className="analytics-hint">Lessons marked done across all tracks</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">🏆</div>
          <div>
            <span className="analytics-label">MCQ Quiz Accuracy</span>
            <h2 className="analytics-value">
              {totalQuizzesTaken > 0 ? `${averageQuizAccuracy}%` : 'N/A'}
              {totalQuizzesTaken > 0 && <span className="analytics-sub"> avg</span>}
            </h2>
          </div>
          <p className="analytics-hint">
            {totalQuizzesTaken > 0
              ? `${totalQuizzesTaken} of ${coursesData.length} subject tests taken`
              : 'No quizzes taken yet — try a test!'}
          </p>
        </div>
      </section>

      {/* ============================================================
          MY LEARNING SECTION (Enrolled Courses with Continue Learning)
          ============================================================ */}
      <section className="my-learning-section">
        <div className="section-header-flex">
          <div>
            <h3 className="section-subheading">📚 My Learning</h3>
            <p className="section-desc">
              Your enrolled courses with progress tracking. Pick up where you left off.
            </p>
          </div>
          <span className="enrolled-count-badge">
            {enrolledCoursesData.length} Enrolled
          </span>
        </div>

        {enrolledCoursesData.length > 0 ? (
          <div className="my-learning-grid">
            {enrolledCoursesData.map((course) => {
              const courseLessons = course.lessons;
              const completedInCourse = courseLessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const percentage = courseLessons.length > 0
                ? Math.round((completedInCourse / courseLessons.length) * 100)
                : 0;
              const nextLesson = getNextLesson(course);
              const quizData = quizScores[course.id];

              return (
                <div key={course.id} className="my-learning-card">
                  <div className="my-learning-card-header">
                    <span className="course-cat">{course.category}</span>
                    {percentage === 100 ? (
                      <span className="status-badge status-completed">Completed ✅</span>
                    ) : (
                      <span className="my-learning-progress-text">{percentage}%</span>
                    )}
                  </div>

                  <h4 className="my-learning-title">{course.title}</h4>

                  <div className="my-learning-stats-row">
                    <span>{completedInCourse} / {courseLessons.length} lessons</span>
                    {quizData && (
                      <span className="my-learning-quiz-score">
                        Quiz: {quizData.percentage}%
                      </span>
                    )}
                  </div>

                  <ProgressBar value={percentage} showLabel={false} height="6px" />

                  {/* Next Lesson Info */}
                  {nextLesson && (
                    <div className="my-learning-next">
                      <span className="next-label">Next up:</span>
                      <span className="next-title">{nextLesson.title}</span>
                    </div>
                  )}

                  {/* Continue Learning Button */}
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn-continue-learning"
                  >
                    {percentage === 100 ? '📖 Review Course' : '▶ Continue Learning'}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-learning-box">
            <span className="empty-notes-icon">📋</span>
            <h3>No courses enrolled yet</h3>
            <p>
              Visit the <Link to="/courses">Courses page</Link> to enroll in a course and start learning.
            </p>
          </div>
        )}
      </section>

      {/* Milestone Badges Section */}
      <section className="milestones-section">
        <h3 className="section-subheading">Learning Milestone Badges</h3>
        <div className="milestones-grid">
          <div className={`milestone-badge ${completedCount >= 1 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{completedCount >= 1 ? '🌟' : '🔒'}</span>
            <div className="milestone-info">
              <h4>First Step</h4>
              <p>Complete at least 1 lesson</p>
            </div>
          </div>

          <div className={`milestone-badge ${completedCount >= 5 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{completedCount >= 5 ? '🔥' : '🔒'}</span>
            <div className="milestone-info">
              <h4>Streak Builder</h4>
              <p>Complete 5 lessons</p>
            </div>
          </div>

          <div className={`milestone-badge ${totalQuizzesTaken >= 1 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{totalQuizzesTaken >= 1 ? '🎯' : '🔒'}</span>
            <div className="milestone-info">
              <h4>Quiz Initiate</h4>
              <p>Complete 1 subject MCQ test</p>
            </div>
          </div>

          <div className={`milestone-badge ${totalMasteredQuizzes >= 1 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{totalMasteredQuizzes >= 1 ? '🏅' : '🔒'}</span>
            <div className="milestone-info">
              <h4>MCQ Master</h4>
              <p>Score 85%+ on any subject test</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject MCQs Performance Section */}
      <section className="quiz-performance-section">
        <div className="section-header-flex">
          <div>
            <h3 className="section-subheading">🎯 Subject MCQs & Testing Breakdown</h3>
            <p className="section-desc">Assess your concept mastery across each topic track.</p>
          </div>
          <Link to="/quiz" className="btn-take-all-quizzes">
            Browse All Quizzes &rarr;
          </Link>
        </div>

        <div className="quiz-cards-grid">
          {coursesData.map((course) => {
            const scoreData = quizScores[course.id];
            const questionsCount = (mcqDatabase[course.id] || []).length;

            return (
              <div key={course.id} className="quiz-stat-card">
                <div className="quiz-stat-header">
                  <span className="quiz-stat-cat">{course.category}</span>
                  {scoreData ? (
                    <span className={`quiz-score-badge ${scoreData.percentage >= 85 ? 'badge-high' : scoreData.percentage >= 60 ? 'badge-med' : 'badge-low'}`}>
                      {scoreData.percentage}% Accuracy
                    </span>
                  ) : (
                    <span className="quiz-score-badge badge-pending">Not Taken</span>
                  )}
                </div>

                <h4 className="quiz-stat-title">{course.title}</h4>
                <p className="quiz-stat-meta">{questionsCount} Questions • Topic Assessment</p>

                {scoreData ? (
                  <div className="quiz-stat-result">
                    <div className="quiz-stat-result-row">
                      <span>Score:</span>
                      <strong>{scoreData.score} / {scoreData.totalQuestions} Correct</strong>
                    </div>
                    <ProgressBar value={scoreData.percentage} height="6px" showLabel={false} />
                  </div>
                ) : (
                  <p className="quiz-stat-prompt">Take the 15-question test to evaluate your understanding.</p>
                )}

                <Link to={`/quiz/${course.id}`} className="btn-stat-quiz">
                  {scoreData ? '🔁 Retake / Review Answers' : '🎯 Start MCQs'}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Per-Course Progress Breakdown */}
      <section className="courses-progress-section">
        <div className="section-header-flex">
          <div>
            <h3 className="section-subheading">Course-by-Course Lessons Breakdown</h3>
            <p className="section-desc">Detailed syllabus completion status for each enrolled track.</p>
          </div>

          {(completedCount > 0 || totalQuizzesTaken > 0) && (
            <button
              className="btn-reset-progress"
              onClick={handleResetProgress}
              title="Reset all tracked lessons and quiz scores"
              type="button"
            >
              🗑️ Reset All Progress
            </button>
          )}
        </div>

        <div className="course-progress-list">
          {coursesData.map((course) => {
            const courseLessons = course.lessons;
            const completedInCourse = courseLessons.filter((l) =>
              completedLessons.includes(l.id)
            ).length;
            const percentage = courseLessons.length > 0
              ? Math.round((completedInCourse / courseLessons.length) * 100)
              : 0;

            return (
              <div key={course.id} className="course-progress-card">
                <div className="course-progress-left">
                  <div className="course-progress-tags">
                    <span className="course-cat">{course.category}</span>
                    <span className="course-dur">{course.duration}</span>
                  </div>
                  <h4 className="course-progress-title">{course.title}</h4>
                  <span className="course-lessons-stat">
                    {completedInCourse} of {courseLessons.length} lessons completed
                  </span>
                </div>

                <div className="course-progress-center">
                  <ProgressBar value={percentage} />
                </div>

                <div className="course-progress-right">
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn-continue-course"
                  >
                    {percentage === 100 ? 'Review Course' : 'Continue →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Progress;
 