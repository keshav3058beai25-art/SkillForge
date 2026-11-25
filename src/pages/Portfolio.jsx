import React from 'react';
import './Portfolio.css';

/**
 * Portfolio Page Component (Mini-Project: Portfolio Site)
 *
 * Demonstrates:
 * 1. A simple student portfolio layout within the existing SkillForge project
 * 2. Sections: Introduction, Skills, Projects, Contact
 * 3. Semantic HTML sections and clean CSS layout
 * 4. This is one additional page inside SkillForge, not a replacement
 *
 * Note: This is a demo portfolio for the FEE evaluation requirement.
 * Update the personal details with your own information before submission.
 */
function Portfolio() {
  // Skills data - local state (only needed by this component)
  const skills = [
    { name: 'HTML5 & Semantic Tags', level: 90 },
    { name: 'CSS3 (Flexbox, Grid, Media Queries)', level: 85 },
    { name: 'JavaScript (ES6+)', level: 80 },
    { name: 'React.js (Hooks, Router, Context)', level: 75 },
    { name: 'Git & GitHub', level: 70 },
    { name: 'Python (Basics & DSA)', level: 65 },
  ];

  // Projects data - local state
  const projects = [
    {
      title: 'SkillForge Learning Dashboard',
      description:
        'A React-based student learning platform with courses, quizzes, progress tracking, notes, and a dashboard. Built for FEE Evaluation.',
      tech: ['React', 'React Router', 'Context API', 'CSS3'],
    },
    {
      title: 'Responsive Portfolio Website',
      description:
        'A clean, responsive personal portfolio showcasing skills, projects, and contact information. Demonstrates modern HTML5 and CSS3.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
    },
    {
      title: 'MCQ Quiz Application',
      description:
        'An interactive quiz system with timed assessments, question navigation, scoring, and detailed answer explanations.',
      tech: ['React', 'useState', 'useEffect', 'useMemo'],
    },
  ];

  return (
    <div className="portfolio-page page-container">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-tag">👤 Portfolio</span>
        <h1 className="page-title">Student Portfolio</h1>
        <p className="page-subtitle">
          A simple portfolio page demonstrating the portfolio-site mini-project
          requirement for FEE Evaluation 2.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="portfolio-intro-card">
        <div className="intro-avatar">👨‍💻</div>
        <div className="intro-content">
          <h2 className="intro-name">Keshav</h2>
          <p className="intro-role">B.Tech CSE Student • Frontend Developer</p>
          <p className="intro-bio">
            I am a second-year Computer Science student passionate about web
            development. I enjoy building clean, responsive user interfaces using
            React and modern CSS. Currently learning advanced frontend concepts
            including state management, routing, and component architecture.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="portfolio-section">
        <h2 className="portfolio-section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="portfolio-section">
        <h2 className="portfolio-section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech-list">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="portfolio-section portfolio-contact">
        <h2 className="portfolio-section-title">Contact Information</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <span className="contact-label">Email</span>
              <span className="contact-value">keshav@example.com</span>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🔗</span>
            <div>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/keshav</span>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <span className="contact-label">Location</span>
              <span className="contact-value">India</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
