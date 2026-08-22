import React from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import ProgressBar from '../components/ProgressBar';
import './Progress.css';

/**
 * Progress Page Component (CHO Evaluation 1 Level)
 * Demonstrates:
 * 1. Array methods (reduce, filter, map) for analytical calculations
 * 2. Lifting state up / receiving global progress props
 * 3. Conditional rendering of progress milestones and achievements
 * 4. Confirmation-gated state reset handler
 */
function Progress({ completedLessons = [], onResetProgress }) {
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

  return (
    <div className="progress-page page-container">
      {/* Header */}
      <header className="page-header">
        <span className="page-tag">📊 Learning Analytics</span>
        <h1 className="page-title">My Progress Dashboard</h1>
        <p className="page-subtitle">
          Track your overall curriculum progress, monitor completed lessons, and earn learning milestones.
        </p>
      </header>

      {/* Main Stats Cards Grid */}
      <section className="analytics-summary-grid">
        <div className="analytics-card card-primary">
          <div className="analytics-icon">🎯</div>
          <div>
            <span className="analytics-label">Overall Completion</span>
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
            <span className="analytics-label">Courses Mastered</span>
            <h2 className="analytics-value">
              {completedCoursesCount} <span className="analytics-sub">/ {coursesData.length}</span>
            </h2>
          </div>
          <p className="analytics-hint">Courses with 100% lessons done</p>
        </div>
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

          <div className={`milestone-badge ${completedCount >= 15 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{completedCount >= 15 ? '🚀' : '🔒'}</span>
            <div className="milestone-info">
              <h4>Semester Champ</h4>
              <p>Complete 15 lessons</p>
            </div>
          </div>

          <div className={`milestone-badge ${completedCoursesCount >= 1 ? 'unlocked' : 'locked'}`}>
            <span className="milestone-icon">{completedCoursesCount >= 1 ? '🎓' : '🔒'}</span>
            <div className="milestone-info">
              <h4>Course Graduate</h4>
              <p>Complete 1 full course</p>
            </div>
          </div>
        </div>
      </section>

      {/* Per-Course Progress Breakdown */}
      <section className="courses-progress-section">
        <div className="section-header-flex">
          <div>
            <h3 className="section-subheading">Course-by-Course Breakdown</h3>
            <p className="section-desc">Detailed status for each enrolled track.</p>
          </div>

          {completedCount > 0 && (
            <button
              className="btn-reset-progress"
              onClick={onResetProgress}
              title="Reset all tracked lessons"
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
                    {percentage === 100 ? 'Review Course' : 'Continue &rarr;'}
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
