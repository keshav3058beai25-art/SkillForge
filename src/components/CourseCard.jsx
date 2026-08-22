import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import './CourseCard.css';

/**
 * CourseCard Component
 * 
 * Concepts Demonstrated:
 * - Semantic HTML (<article>, <header>, <footer>)
 * - Functional Component
 * - Props receiving (course object, completedLessons array)
 * - Object destructuring
 * - Array filter() and includes() methods for progress calculation
 * - Conditional rendering for completed status badge
 * - Component composition (ProgressBar child component)
 */
function CourseCard({ course, completedLessons = [] }) {
  // Destructure properties from the course prop
  const {
    id,
    title,
    category,
    duration,
    level,
    instructor,
    description,
    lessons = []
  } = course;

  // Calculate how many lessons in this course have been completed by the student
  const completedInCourse = lessons.filter((lesson) =>
    completedLessons.includes(lesson.id)
  ).length;

  const totalLessons = lessons.length;
  const percentage =
    totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;

  const isFullyCompleted = totalLessons > 0 && completedInCourse === totalLessons;

  return (
    <article className="course-card">
      {/* Top Category and Status Tags */}
      <div className="card-top-row">
        <span className="course-badge">{category}</span>
        {isFullyCompleted ? (
          <span className="status-badge status-completed">Completed ✅</span>
        ) : (
          <span className="course-level-pill">{level}</span>
        )}
      </div>

      {/* Course Title and Description */}
      <h3 className="course-card-title">
        <Link to={`/courses/${id}`}>{title}</Link>
      </h3>
      <p className="course-card-description">{description}</p>

      {/* Instructor & Duration Meta Info */}
      <div className="course-meta">
        <div className="meta-item">
          <span className="meta-label">Instructor</span>
          <span className="meta-val">{instructor}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Duration</span>
          <span className="meta-val">{duration}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="card-progress-section">
        <div className="progress-info-row">
          <span className="lesson-count-text">
            {completedInCourse} of {totalLessons} lessons done
          </span>
        </div>
        <ProgressBar value={percentage} showLabel={true} />
      </div>

      {/* Card Action Link */}
      <div className="card-footer-action">
        <Link to={`/courses/${id}`} className="btn-view-course">
          {percentage === 100 ? 'Review Lessons' : 'Start / Continue &rarr;'}
        </Link>
      </div>
    </article>
  );
}

export default CourseCard;
