import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * 
 * Concepts Demonstrated:
 * - Semantic HTML (<footer>, <section>)
 * - Functional Component
 * - Pure CSS Layout (Flexbox / Grid)
 * - Navigation links
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Summary */}
        <div className="footer-section brand-summary">
          <div className="footer-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-name">Skill<span className="brand-accent">Forge</span></span>
          </div>
          <p className="footer-description">
            A practical learning dashboard designed for B.Tech Computer Science students to track curriculum progress, master key concepts, and prepare for technical viva evaluations.
          </p>
          <div className="tech-stack-pills">
            <span className="tech-pill">HTML5</span>
            <span className="tech-pill">CSS3</span>
            <span className="tech-pill">JavaScript ES6+</span>
            <span className="tech-pill">React</span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Dashboard Home</Link></li>
            <li><Link to="/courses">Courses Catalog</Link></li>
            <li><Link to="/progress">My Progress</Link></li>
            <li><Link to="/notes">Study Notebook</Link></li>
          </ul>
        </div>

        {/* Student Evaluation Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Academic Project</h4>
          <p className="academic-info">
            <strong>B.Tech CSE – 2nd Year</strong>
            <br />
            Course: Frontend Web Development
            <br />
            Component: Project Evaluation-II
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} SkillForge Learning Portal. Built with pure React &amp; CSS3.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
