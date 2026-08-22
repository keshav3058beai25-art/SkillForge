import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component (CHO Evaluation 1 Level)
 * Demonstrates: React Router catch-all route rendering, semantic error card, and Link navigation back to home.
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
      </div>
    </div>
  );
}

export default NotFound;
