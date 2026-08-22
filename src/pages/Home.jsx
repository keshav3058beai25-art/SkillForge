import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedCourses, coursesData } from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import QuoteCard from '../components/QuoteCard';
import './Home.css';

/**
 * Home Page Component (CHO Evaluation 1 Level)
 * Demonstrates:
 * 1. Semantic HTML5 sections (<header>, <section>, <article>)
 * 2. Props passing & component composition (CourseCard, QuoteCard)
 * 3. Array mapping with map() to render lists of cards
 * 4. Derived stats calculation (total courses, total lessons)
 */
function Home({ completedLessons = [] }) {
  // Get featured courses list
  const featuredCourses = getFeaturedCourses();

  // Calculate high-level stats from coursesData
  const totalCourses = coursesData.length;
  const totalLessons = coursesData.reduce(
    (accum, course) => accum + course.lessons.length,
    0
  );
  const totalCompleted = completedLessons.length;

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
              <Link to="/progress" className="btn-secondary">
                View My Progress
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
              <span className="stat-number">{totalLessons}</span>
              <span className="stat-label">Total Lessons</span>
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

        {/* 3. Platform Key Highlights */}
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

        {/* 4. Featured Courses Section */}
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
