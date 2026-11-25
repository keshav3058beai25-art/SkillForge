import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 *
 * Concepts Demonstrated:
 * - Semantic HTML (<header>, <nav>)
 * - Functional Component
 * - useState for mobile menu toggle (open / closed state)
 * - Conditional CSS classes
 * - React Router NavLink for active page highlighting
 */
function Navbar() {
  // State to track whether mobile navigation menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when a navigation link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Skill<span className="brand-accent">Forge</span></span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
            end
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            📚 Courses
          </NavLink>

          <NavLink
            to="/quiz"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            🎯 MCQs
          </NavLink>

          <NavLink
            to="/progress"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            📈 Progress
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            📝 Notes
          </NavLink>

          <NavLink
            to="/portfolio"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            👤 Portfolio
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleLinkClick}
          >
            ℹ️ About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
