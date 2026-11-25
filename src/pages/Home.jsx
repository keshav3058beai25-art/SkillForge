import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedCourses, coursesData } from '../data/coursesData';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import QuoteCard from '../components/QuoteCard';
import ProgressBar from '../components/ProgressBar';
import './Home.css';

/**
 * Home Page Component (Enhanced for Evaluation 2)
 * Demonstrates:
 * 1. Semantic HTML5 sections (<header>, <section>, <article>)
 * 2. useContext via useApp() hook to read global state (no props needed)
 * 3. Component composition (CourseCard, QuoteCard, ProgressBar)
 * 4. Array mapping with map() to render lists of cards
 * 5. Derived stats calculation (total courses, total lessons)
 * 6. Learning Progress Summary — shows overall completion and quiz stats
 * 7. Quick Navigation Links — easy access to all major pages
 */
function Home() {
  // Read completedLessons and quizScores from global context
  const { completedLessons, quizScores, notesCount } = useApp();

  // Get featured courses list
  const featuredCourses = getFeaturedCourses();

  // Calculate high-level stats from coursesData
  const totalCourses = coursesData.length;
  const totalLessons = coursesData.reduce(
    (accum, course) => accum + course.lessons.length,
    0
  );
  const totalCompleted = completedLessons.length;
  const overallProgress =
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Quiz statistics
  const quizEntries = Object.values(quizScores);
  const quizzesTaken = quizEntries.length;

  // Completed courses count
  const completedCoursesCount = coursesData.filter((course) =>
    course.lessons.every((lesson) => completedLessons.includes(lesson.id))
  ).length;

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">🚀 Student Learning Dashboard</span>
            <h1 className="hero-title">
              Master Modern Web & <span className="highlight-text">Core Computer Science</span>
            </h1>
            <p className="hero-description">
              SkillForge is a lightweight student dashboard built to organize your technical curriculum,
              track lesson completions, and take study notes in one clean interface.
            </p>

            <div className="hero-actions">
              <Link to="/courses" className="btn-primary">
                Explore Courses &rarr;
              </Link>
              <Link to="/quiz" className="btn-secondary">
                🎯 Practice Subject MCQs
              </Link>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-number">{totalCourses}</span>
              <span className="stat-label">Structured Courses</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28</span>
              <span className="stat-label">7 MCQs per Subject</span>
            </div>
            <div className="stat-card stat-card-highlight">
              <span className="stat-number">{totalCompleted}</span>
              <span className="stat-label">Lessons Completed</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* 2. Daily Motivation & Async Fetch Card */}
        <QuoteCard />

        {/* 3. Learning Progress Summary (New for Eval 2) */}
        <section className="home-progress-section">
          <div className="section-header">
            <h2 className="section-title">📈 Your Learning Progress</h2>
            <p className="section-subtitle">
              A quick snapshot of how far you've come across all courses.
            </p>
          </div>

          <div className="home-progress-grid">
            {/* Overall Progress Card */}
            <div className="home-progress-card home-progress-main">
              <div className="home-progress-header">
                <span className="home-progress-label">Overall Completion</span>
                <span className="home-progress-value">{overallProgress}%</span>
              </div>
              <ProgressBar value={overallProgress} showLabel={false} height="10px" />
              <p className="home-progress-detail">
                {totalCompleted} of {totalLessons} lessons completed
              </p>
            </div>

            {/* Mini Stat Cards */}
            <div className="home-progress-card home-mini-stat">
              <span className="home-mini-icon">✅</span>
              <div>
                <span className="home-mini-value">{completedCoursesCount}/{totalCourses}</span>
                <span className="home-mini-label">Courses Done</span>
              </div>
            </div>

            <div className="home-progress-card home-mini-stat">
              <span className="home-mini-icon">🎯</span>
              <div>
                <span className="home-mini-value">{quizzesTaken}/{totalCourses}</span>
                <span className="home-mini-label">Quizzes Taken</span>
              </div>
            </div>

            <div className="home-progress-card home-mini-stat">
              <span className="home-mini-icon">📝</span>
              <div>
                <span className="home-mini-value">{notesCount}</span>
                <span className="home-mini-label">Study Notes</span>
              </div>
            </div>
          </div>

          <div className="home-progress-actions">
            <Link to="/progress" className="home-progress-link">
              View Detailed Progress →
            </Link>
            <Link to="/dashboard" className="home-progress-link home-progress-link-alt">
              Open Dashboard →
            </Link>
          </div>
        </section>

        {/* 4. Quick Navigation Links (New for Eval 2) */}
        <section className="home-quick-nav">
          <div className="section-header">
            <h2 className="section-title">🧭 Explore SkillForge</h2>
            <p className="section-subtitle">
              Jump to any section of the platform with one click.
            </p>
          </div>

          <div className="home-nav-grid">
            <Link to="/courses" className="home-nav-card">
              <span className="home-nav-icon">📚</span>
              <h3 className="home-nav-title">Courses</h3>
              <p className="home-nav-desc">Browse all {totalCourses} structured courses with lesson roadmaps.</p>
            </Link>

            <Link to="/quiz" className="home-nav-card">
              <span className="home-nav-icon">🎯</span>
              <h3 className="home-nav-title">MCQs & Quizzes</h3>
              <p className="home-nav-desc">Test your knowledge with subject-specific multiple choice questions.</p>
            </Link>

            <Link to="/progress" className="home-nav-card">
              <span className="home-nav-icon">📈</span>
              <h3 className="home-nav-title">Progress</h3>
              <p className="home-nav-desc">Track lesson completions, quiz scores, and milestones.</p>
            </Link>

            <Link to="/notes" className="home-nav-card">
              <span className="home-nav-icon">📝</span>
              <h3 className="home-nav-title">Notes</h3>
              <p className="home-nav-desc">Save study notes and key takeaways per course.</p>
            </Link>

            <Link to="/dashboard" className="home-nav-card">
              <span className="home-nav-icon">📊</span>
              <h3 className="home-nav-title">Dashboard</h3>
              <p className="home-nav-desc">See your full learning overview with stats and breakdown tables.</p>
            </Link>

            <Link to="/portfolio" className="home-nav-card">
              <span className="home-nav-icon">👤</span>
              <h3 className="home-nav-title">Portfolio</h3>
              <p className="home-nav-desc">View the student portfolio page built as a mini-project.</p>
            </Link>
          </div>
        </section>

        {/* 5. Platform Key Highlights */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">Why SkillForge?</h2>
            <p className="section-subtitle">
              Designed specifically for engineering students to master technical concepts efficiently.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Structured Curriculum</h3>
              <p className="feature-desc">
                Step-by-step topic roadmaps covering HTML5, CSS3, JavaScript ES6+, React, SQL, and Data Structures.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Interactive Subject MCQs</h3>
              <p className="feature-desc">
                10-15 topic questions per subject with real-time scoring and comprehensive answer keys with explanations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Real-Time Progress</h3>
              <p className="feature-desc">
                Check off lessons as you complete them and watch your course completion bars update instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Saved Study Notes</h3>
              <p className="feature-desc">
                Quickly jot down key takeaways and formulas per course, saved directly in your browser's localStorage.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Featured Courses Section */}
        <section className="featured-section">
          <div className="section-header-flex">
            <div>
              <h2 className="section-title">Featured Courses</h2>
              <p className="section-subtitle">Recommended starting points for your semester learning.</p>
            </div>
            <Link to="/courses" className="link-view-all">
              View All {totalCourses} Courses &rarr;
            </Link>
          </div>

          <div className="courses-grid">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                completedLessons={completedLessons}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
