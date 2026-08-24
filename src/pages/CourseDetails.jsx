import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById } from '../data/coursesData';
import { getMCQsByCourseId } from '../data/mcqData';
import ProgressBar from '../components/ProgressBar';
import './CourseDetails.css';

/**
 * CourseDetails Page Component (CHO Evaluation 1 Level)
 * Demonstrates:
 * 1. React Router useParams() for dynamic route parameter extraction (/courses/:id)
 * 2. React Router useNavigate() for programmatic route navigation
 * 3. Conditional rendering if the course ID is invalid
 * 4. State updates & lifting state up (toggling lesson completion)
 * 5. Dynamic progress calculation derived from completed lessons
 * 6. Integration with Subject MCQs and test assessment system
 */
function CourseDetails({ completedLessons = [], onToggleLesson }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find course matching URL parameter
  const course = getCourseById(id);

  // If no course matches the ID, show a clean not-found message
  if (!course) {
    return (
      <div className="course-details-page page-container">
        <div className="course-not-found">
          <h2>Course Not Found</h2>
          <p>The course with ID #{id} does not exist in our catalog.</p>
          <button className="btn-back" onClick={() => navigate('/courses')}>
            &larr; Back to Courses Catalog
          </button>
        </div>
      </div>
    );
  }

  const { title, category, duration, level, instructor, description, overview, lessons = [] } = course;

  // Retrieve course MCQs
  const courseMCQs = getMCQsByCourseId(course.id);
  const mcqCount = courseMCQs.length;

  // Retrieve saved quiz score for this course if available
  let savedScore = null;
  try {
    const scores = JSON.parse(localStorage.getItem('skillforge_quiz_scores') || '{}');
    if (scores[course.id]) {
      savedScore = scores[course.id];
    }
  } catch (e) {
    console.error(e);
  }

  // Calculate course-specific completion percentage
  const totalLessons = lessons.length;
  const completedInThisCourse = lessons.filter((lesson) =>
    completedLessons.includes(lesson.id)
  ).length;

  const completionPercentage = totalLessons > 0
    ? Math.round((completedInThisCourse / totalLessons) * 100)
    : 0;

  return (
    <div className="course-details-page page-container">
      {/* Top Breadcrumb Navigation */}
      <div className="details-nav-bar">
        <button className="btn-back-link" onClick={() => navigate('/courses')}>
          &larr; Back to All Courses
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{title}</span>
      </div>

      {/* Course Banner / Header */}
      <header className="course-banner">
        <div className="banner-top-meta">
          <span className="course-category-tag">{category}</span>
          <span className="course-level-tag">Level: {level}</span>
          <span className="course-mcq-tag">🎯 {mcqCount} MCQs Available</span>
        </div>

        <h1 className="course-banner-title">{title}</h1>
        <p className="course-banner-desc">{description}</p>

        <div className="banner-actions-row">
          <div className="course-instructor-info">
            <div className="instructor-avatar">👨‍🏫</div>
            <div>
              <span className="instructor-label">Instructor</span>
              <strong className="instructor-name">{instructor}</strong>
            </div>
            <div className="course-duration-box">
              <span className="duration-label">Duration</span>
              <strong className="duration-value">{duration}</strong>
            </div>
          </div>

          <div className="banner-quiz-cta">
            <Link to={`/quiz/${course.id}`} className="btn-banner-quiz">
              🎯 Take Subject MCQs ({mcqCount} Questions) &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout (Overview + Syllabus + MCQ Testing) */}
      <div className="course-details-grid">
        {/* Left Column: Syllabus & Interactive Checkbox List */}
        <div className="syllabus-column">
          {/* MCQ Knowledge Assessment Banner */}
          <div className="mcq-highlight-card">
            <div className="mcq-highlight-content">
              <div className="mcq-badge-row">
                <span className="mcq-star-badge">✨ Assessment Available</span>
                {savedScore && (
                  <span className="mcq-score-pill">
                    Last Score: <strong>{savedScore.score}/{savedScore.totalQuestions} ({savedScore.percentage}%)</strong>
                  </span>
                )}
              </div>
              <h3 className="mcq-highlight-title">Test Your Mastery with {mcqCount} MCQs</h3>
              <p className="mcq-highlight-desc">
                Evaluate your knowledge on topic variables, syntax, methods, and practical logic. Complete all questions to view scores, full correct answers, and conceptual explanations.
              </p>
            </div>
            <Link to={`/quiz/${course.id}`} className="btn-launch-mcqs">
              {savedScore ? '🔁 Retake MCQs' : '🚀 Start MCQ Practice'}
            </Link>
          </div>

          <div className="syllabus-header">
            <div>
              <h2 className="syllabus-title">Course Syllabus & Topics ({totalLessons} Core Topics)</h2>
              <p className="syllabus-subtitle">
                {savedScore
                  ? "🎉 All topics verified and completed via the 7-question MCQ assessment."
                  : "Complete the 7 Subject MCQs to verify your concept understanding and mark all topics completed."}
              </p>
            </div>
            <span className="lesson-badge-count">
              {completedInThisCourse} of {totalLessons} Completed
            </span>
          </div>

          {/* Prompt if MCQs not taken yet */}
          {!savedScore && (
            <div className="mcq-lock-notice">
              <span className="lock-icon">🔒</span>
              <div className="lock-text">
                <strong>MCQ Verification Required</strong>
                <p>Complete the 7 subject multiple-choice questions to complete all {totalLessons} topics below.</p>
              </div>
              <Link to={`/quiz/${course.id}`} className="btn-unlock-quiz">
                Take 7 MCQs &rarr;
              </Link>
            </div>
          )}

          {/* Lessons List */}
          <div className="lessons-list">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`lesson-item ${isCompleted ? 'lesson-item-completed' : ''}`}
                >
                  <label className="lesson-checkbox-container">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => onToggleLesson(lesson.id)}
                      className="lesson-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                  </label>

                  <div className="lesson-details">
                    <div className="lesson-meta-row">
                      <span className="lesson-number">Topic {index + 1}</span>
                      {savedScore && isCompleted && (
                        <span className="badge-topic-verified">✅ Verified by 7 MCQs</span>
                      )}
                    </div>
                    <h4 className="lesson-title">{lesson.title}</h4>
                  </div>

                  <span className="lesson-duration">{lesson.duration}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Progress & Overview Sidebar */}
        <aside className="course-sidebar">
          {/* MCQ Practice Sidebar Card */}
          <div className="sidebar-card sidebar-card-mcq">
            <div className="sidebar-mcq-header">
              <span className="sidebar-mcq-icon">🎯</span>
              <div>
                <h3 className="sidebar-card-title">Subject Quiz & MCQs</h3>
                <span className="sidebar-mcq-sub">{mcqCount} Questions Available</span>
              </div>
            </div>

            {savedScore ? (
              <div className="sidebar-score-box">
                <div className="score-row">
                  <span>Best Accuracy:</span>
                  <strong className="score-highlight">{savedScore.percentage}%</strong>
                </div>
                <div className="score-row">
                  <span>Score:</span>
                  <span>{savedScore.score} / {savedScore.totalQuestions} Correct</span>
                </div>
              </div>
            ) : (
              <p className="sidebar-mcq-text">
                Test your understanding of {title} with real exam-level multiple choice questions.
              </p>
            )}

            <Link
              to={`/quiz/${course.id}`}
              className="btn-sidebar-take-quiz"
            >
              {savedScore ? '📖 Review & Retake Quiz' : `🎯 Start ${mcqCount} Question Quiz`}
            </Link>
          </div>

          {/* Progress Card */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Your Course Progress</h3>
            <ProgressBar value={completionPercentage} />
            <p className="progress-summary-text">
              {completionPercentage === 100
                ? "🎉 Fantastic! You have completed all lessons in this course."
                : `${totalLessons - completedInThisCourse} lesson(s) left to complete this course.`}
            </p>

            <Link
              to={`/notes?course=${encodeURIComponent(title)}`}
              className="btn-take-notes"
            >
              📝 Take Notes for this Course
            </Link>
          </div>

          {/* Course Overview Card */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">What You Will Learn</h3>
            <p className="overview-text">{overview}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CourseDetails;
