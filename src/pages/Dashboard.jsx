import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { coursesData } from '../data/coursesData';
import ProgressBar from '../components/ProgressBar';
import './Dashboard.css';

/**
 * Dashboard Page Component (Mini-Project for Evaluation 2)
 *
 * Concepts Demonstrated:
 * 1. useContext via useApp() hook - reads global state without props
 * 2. Derived calculations from context state (progress %, completed courses)
 * 3. Automatic updates - when user completes lessons, takes quizzes, or adds notes,
 *    the dashboard values update instantly because they come from shared context
 * 4. This serves as the "Shopping Cart / Dashboard" mini-project requirement
 *
 * Global State Used (from AppContext):
 * - completedLessons → count of completed lessons
 * - quizScores → recent quiz results
 * - notes → notes count
 * - totalCourses, completedCoursesCount, overallProgress → derived values
 */
function Dashboard() {
  // Read all needed values from global context (no props needed!)
  const {
    completedLessons,
    quizScores,
    notes,
    totalCourses,
    totalLessons,
    completedCoursesCount,
    overallProgress,
    notesCount,
  } = useApp();

  // Quiz statistics derived from quizScores
  const quizEntries = Object.values(quizScores);
  const totalQuizzesTaken = quizEntries.length;
  const averageQuizScore =
    totalQuizzesTaken > 0
      ? Math.round(
          quizEntries.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzesTaken
        )
      : 0;

  // Per-course progress for the breakdown table
  const courseProgress = coursesData.map((course) => {
    const completedInCourse = course.lessons.filter((l) =>
      completedLessons.includes(l.id)
    ).length;
    const percentage =
      course.lessons.length > 0
        ? Math.round((completedInCourse / course.lessons.length) * 100)
        : 0;
    const quizData = quizScores[course.id];

    return {
      id: course.id,
      title: course.title,
      category: course.category,
      completedLessons: completedInCourse,
      totalLessons: course.lessons.length,
      percentage,
      quizScore: quizData ? `${quizData.percentage}%` : '—',
    };
  });

  return (
    <div className="dashboard-page page-container">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-tag">📊 Learning Dashboard</span>
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-subtitle">
          A real-time overview of your learning progress. All values update
          automatically when you complete lessons, take quizzes, or add notes.
        </p>
      </header>

      {/* Main Stats Cards */}
      <section className="dashboard-stats-grid">
        <div className="dash-stat-card dash-card-primary">
          <div className="dash-stat-icon">📚</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Total Courses</span>
            <h2 className="dash-stat-value">{totalCourses}</h2>
          </div>
        </div>

        <div className="dash-stat-card dash-card-success">
          <div className="dash-stat-icon">✅</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Completed Courses</span>
            <h2 className="dash-stat-value">
              {completedCoursesCount}{' '}
              <span className="dash-stat-sub">/ {totalCourses}</span>
            </h2>
          </div>
        </div>

        <div className="dash-stat-card dash-card-info">
          <div className="dash-stat-icon">🎯</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Overall Progress</span>
            <h2 className="dash-stat-value">{overallProgress}%</h2>
          </div>
          <div className="dash-stat-bar">
            <ProgressBar value={overallProgress} showLabel={false} height="8px" />
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">📝</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Study Notes</span>
            <h2 className="dash-stat-value">{notesCount}</h2>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">🏆</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Quizzes Taken</span>
            <h2 className="dash-stat-value">
              {totalQuizzesTaken}{' '}
              <span className="dash-stat-sub">/ {totalCourses}</span>
            </h2>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">📈</div>
          <div className="dash-stat-content">
            <span className="dash-stat-label">Avg Quiz Score</span>
            <h2 className="dash-stat-value">
              {totalQuizzesTaken > 0 ? `${averageQuizScore}%` : 'N/A'}
            </h2>
          </div>
        </div>
      </section>

      {/* Course Progress Breakdown Table */}
      <section className="dashboard-breakdown">
        <h3 className="section-subheading">Course Progress Breakdown</h3>
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Lessons</th>
                <th>Progress</th>
                <th>Quiz Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseProgress.map((cp) => (
                <tr key={cp.id}>
                  <td className="table-course-name">{cp.title}</td>
                  <td>
                    <span className="table-category-pill">{cp.category}</span>
                  </td>
                  <td>
                    {cp.completedLessons} / {cp.totalLessons}
                  </td>
                  <td className="table-progress-cell">
                    <ProgressBar
                      value={cp.percentage}
                      showLabel={false}
                      height="6px"
                    />
                    <span className="table-progress-text">{cp.percentage}%</span>
                  </td>
                  <td>{cp.quizScore}</td>
                  <td>
                    <Link
                      to={`/courses/${cp.id}`}
                      className="table-action-link"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Quiz Scores */}
      {totalQuizzesTaken > 0 && (
        <section className="dashboard-recent-quizzes">
          <h3 className="section-subheading">Recent Quiz Results</h3>
          <div className="recent-quiz-cards">
            {quizEntries.map((quiz) => (
              <div key={quiz.courseId} className="recent-quiz-card">
                <div className="rq-card-header">
                  <span className="rq-course-name">{quiz.courseTitle}</span>
                  <span
                    className={`rq-score-badge ${
                      quiz.percentage >= 85
                        ? 'rq-high'
                        : quiz.percentage >= 60
                        ? 'rq-med'
                        : 'rq-low'
                    }`}
                  >
                    {quiz.percentage}%
                  </span>
                </div>
                <p className="rq-score-detail">
                  {quiz.score} / {quiz.totalQuestions} correct
                </p>
                <Link to={`/quiz/${quiz.courseId}`} className="rq-retake-link">
                  Retake Quiz →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Navigation Links */}
      <section className="dashboard-quick-links">
        <h3 className="section-subheading">Quick Actions</h3>
        <div className="quick-links-grid">
          <Link to="/courses" className="quick-link-card">
            <span className="ql-icon">📚</span>
            <span className="ql-text">Browse Courses</span>
          </Link>
          <Link to="/quiz" className="quick-link-card">
            <span className="ql-icon">🎯</span>
            <span className="ql-text">Take a Quiz</span>
          </Link>
          <Link to="/notes" className="quick-link-card">
            <span className="ql-icon">📝</span>
            <span className="ql-text">Add Notes</span>
          </Link>
          <Link to="/progress" className="quick-link-card">
            <span className="ql-icon">📊</span>
            <span className="ql-text">View Progress</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
