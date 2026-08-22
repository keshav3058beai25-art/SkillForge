import React, { useState } from 'react';
import { coursesData, getCategories } from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import './Courses.css';

/**
 * Courses Page Component
 * 
 * Concepts Demonstrated:
 * 1. Functional Component & Props
 * 2. useState hook for search term and category filter
 * 3. Array filter() and includes() methods for searching courses
 * 4. Controlled input component (value and onChange)
 * 5. Conditional rendering (results vs empty state message)
 * 6. Rendering lists with Array.map() and unique key props
 */
function Courses({ completedLessons = [] }) {
  // State for search query and category filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique list of categories from dataset
  const categories = getCategories();

  // Filter courses based on user's search text and category selection
  const filteredCourses = coursesData.filter((course) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle clearing search input
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="courses-page page-container">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-tag">📚 Course Catalog</span>
        <h1 className="page-title">Explore Learning Tracks</h1>
        <p className="page-subtitle">
          Select a course below to view its syllabus, track completed lessons, and master core topics.
        </p>
      </header>

      {/* Filter and Search Controls */}
      <section className="courses-controls">
        {/* Search Bar Input */}
        <div className="search-box">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by topic, e.g. React, JavaScript, SQL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn-clear-search"
              onClick={handleClearSearch}
              title="Clear search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Buttons */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-pill ${
                selectedCategory === category ? 'filter-pill-active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Results Count Bar */}
      <div className="results-count-bar">
        <span>
          Showing <strong>{filteredCourses.length}</strong> of {coursesData.length} courses
        </span>
        {selectedCategory !== 'All' && (
          <span className="active-filter-indicator">
            Filtered by: <strong>{selectedCategory}</strong>
          </span>
        )}
      </div>

      {/* Courses Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completedLessons={completedLessons}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results-box">
          <span className="empty-icon">🔍</span>
          <h3>No courses found</h3>
          <p>
            No courses match your search query "{searchTerm}". Try another keyword or clear the filter.
          </p>
          <button
            className="btn-reset-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            type="button"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Courses;
