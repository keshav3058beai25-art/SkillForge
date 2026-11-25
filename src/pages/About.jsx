import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

/**
 * About Page Component
 *
 * Demonstrates:
 * 1. Static informational page with semantic HTML
 * 2. React Router Link for internal navigation
 * 3. Organized sections with clean layout
 */
function About() {
  return (
    <div className="about-page page-container">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-tag">ℹ️ About</span>
        <h1 className="page-title">About SkillForge</h1>
        <p className="page-subtitle">
          Learn more about this project, the technology stack used, and the
          concepts demonstrated.
        </p>
      </header>
        
      {/* Project Overview */}
      <section className="about-section">
        <h2 className="about-section-title">What is SkillForge?</h2>
        <p className="about-text">
          SkillForge is a student learning dashboard built as a Frontend
          Engineering (FEE) project. It helps B.Tech Computer Science students
          organize their technical curriculum, track lesson completions, practice
          MCQ-based assessments, and take study notes — all in one clean,
          responsive interface.
        </p>
        <p className="about-text">
          This project is a Single Page Application (SPA) built entirely with
          React.js. It demonstrates multi-page routing, global state management
          with Context API, form handling, asynchronous data loading, and
          responsive CSS design.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2 className="about-section-title">Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <div>
              <h3>React 18</h3>
              <p>Functional components, hooks, Context API</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🛣️</span>
            <div>
              <h3>React Router v6</h3>
              <p>Client-side SPA routing with NavLink active states</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🎨</span>
            <div>
              <h3>Pure CSS3</h3>
              <p>Custom properties, Flexbox, Grid, media queries</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">⚡</span>
            <div>
              <h3>Vite</h3>
              <p>Fast development server and build tool</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">💾</span>
            <div>
              <h3>localStorage</h3>
              <p>Browser-based data persistence for progress and notes</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">📦</span>
            <div>
              <h3>ES6+ JavaScript</h3>
              <p>Arrow functions, destructuring, spread, async/await</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="about-section">
        <h2 className="about-section-title">Key Concepts Demonstrated</h2>
        <ul className="concepts-list">
          <li>
            <strong>React Router (SPA):</strong> Multi-page navigation without
            full page reloads using Routes, Route, NavLink, useParams, and
            useNavigate.
          </li>
          <li>
            <strong>Context API:</strong> Global state management using
            createContext, Provider, and useContext to share data across
            components without prop drilling.
          </li>
          <li>
            <strong>Controlled Forms:</strong> Form inputs driven by React state
            with validation, error messages, and reusable input components.
          </li>
          <li>
            <strong>Asynchronous Loading:</strong> Promise-based data fetching
            with loading, success, error, and retry states.
          </li>
          <li>
            <strong>useState &amp; useEffect:</strong> Local and global state
            management with side effects for localStorage synchronization.
          </li>
          <li>
            <strong>Responsive Design:</strong> CSS media queries, Flexbox, and
            Grid ensuring the app works on desktop, tablet, and mobile.
          </li>
          <li>
            <strong>Component Composition:</strong> Reusable components like
            CourseCard, ProgressBar, FormInput, and QuoteCard.
          </li>
        </ul>
      </section>

      {/* Academic Info */}
      <section className="about-section about-academic">
        <h2 className="about-section-title">Academic Project</h2>
        <div className="academic-card">
          <p>
            <strong>Program:</strong> B.Tech Computer Science &amp; Engineering
          </p>
          <p>
            <strong>Course:</strong> Frontend Web Development (FEE)
          </p>
          <p>
            <strong>Component:</strong> Project Evaluation 2
          </p>
          <p>
            <strong>Built with:</strong> React 18 + Vite + Pure CSS3
          </p>
        </div>
      </section>

      {/* Navigation CTA */}
      <div className="about-cta">
        <Link to="/dashboard" className="btn-primary">
          View Dashboard →
        </Link>
        <Link to="/courses" className="btn-secondary">
          Explore Courses
        </Link>
      </div>
    </div>
  );
}

export default About;