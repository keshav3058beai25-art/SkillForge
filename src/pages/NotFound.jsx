import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component (Enhanced for Evaluation 2)
 * Demonstrates: React Router catch-all route rendering, semantic error card,
 * Link navigation back to home, and suggested navigation links for better UX.
 */
function NotFound() {
  return (
    <div className="notfound-page page-container">
      <div className="notfound-card">
        <span className="notfound-emoji">🔍</span>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">
          Oops! The page or course you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-home-return">
          &larr; Return to Home Dashboard
        </Link>

        {/* Suggested Links */}
        <div className="notfound-suggestions">
          <p className="notfound-suggest-label">Or try one of these:</p>
          <div className="notfound-links">
            <Link to="/courses" className="notfound-link">📚 Courses</Link>
            <Link to="/quiz" className="notfound-link">🎯 MCQs</Link>
            <Link to="/progress" className="notfound-link">📈 Progress</Link>
            <Link to="/notes" className="notfound-link">📝 Notes</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
