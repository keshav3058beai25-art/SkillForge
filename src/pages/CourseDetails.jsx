import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById } from '../data/coursesData';
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
        </div>

        <h1 className="course-banner-title">{title}</h1>
        <p className="course-banner-desc">{description}</p>

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
      </header>

      {/* Main Content Layout (Overview + Syllabus) */}
      <div className="course-details-grid">
        {/* Left Column: Syllabus & Interactive Checkbox List */}
        <div className="syllabus-column">
          <div className="syllabus-header">
            <div>
              <h2 className="syllabus-title">Course Syllabus & Lessons</h2>
              <p className="syllabus-subtitle">
                Check off lessons as you complete them to track your learning progress.
              </p>
            </div>
            <span className="lesson-badge-count">
              {completedInThisCourse} of {totalLessons} Completed
            </span>
          </div>

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
                    <span className="lesson-number">Lesson {index + 1}</span>
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
