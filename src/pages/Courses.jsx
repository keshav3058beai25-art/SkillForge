import React, { useState, useEffect } from 'react';
import { coursesData, getCategories } from '../data/coursesData';
import { fetchCourses } from '../data/fetchCourses';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import './Courses.css';

/**
 * Courses Page Component
 *
 * Concepts Demonstrated:
 * 1. useContext via useApp() hook to read completedLessons from global state
 * 2. Asynchronous data loading with loading, success, error, and retry states
 * 3. useState hook for search term, category filter, and async state
 * 4. useEffect hook to trigger async fetch on component mount
 * 5. Array filter() and includes() methods for searching courses
 * 6. Controlled input component (value and onChange)
 * 7. Conditional rendering (loading spinner, error message, results, empty state)
 * 8. Rendering lists with Array.map() and unique key props
 *
 * Async Loading Pattern:
 * - fetchCourses() returns a Promise that simulates a network delay
 * - While loading: a spinner is shown
 * - On success: courses are rendered
 * - On error: an error message + Retry button is shown
 * - This exact pattern works with real APIs (fetch/axios) in production
 */
function Courses() {
  // Read completedLessons from global context (instead of props)
  const { completedLessons } = useApp();

  // State for search query and category filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Async loading states
  const [courses, setCourses] = useState([]);       // Loaded course data
  const [isLoading, setIsLoading] = useState(true);  // Loading indicator
  const [error, setError] = useState(null);           // Error message

  // Get unique list of categories from static dataset (for filter buttons)
  const categories = getCategories();

  /**
   * loadCourses - Async function that fetches courses using a Promise
   * Demonstrates: async/await, try/catch, loading/error state management
   */
  const loadCourses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // fetchCourses() returns a Promise that resolves after a simulated delay
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      // If the Promise rejects, set the error message
      setError(err.message || 'Something went wrong while loading courses.');
    } finally {
      // Always turn off loading spinner
      setIsLoading(false);
    }
  };

  // useEffect with empty dependency array [] runs once on mount
  useEffect(() => {
    loadCourses();
  }, []);

  // Filter courses based on user's search text and category selection
  const filteredCourses = courses.filter((course) => {
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

      {/* ============================================================
          ASYNC STATE: Loading / Error / Success
          ============================================================ */}

      {/* Loading State — shown while fetchCourses() Promise is pending */}
      {isLoading && (
        <div className="courses-loading-state">
          <div className="loading-spinner-large"></div>
          <p className="loading-text">Loading courses...</p>
        </div>
      )}

      {/* Error State — shown when fetchCourses() Promise rejects */}
      {!isLoading && error && (
        <div className="courses-error-state">
          <span className="error-icon">⚠️</span>
          <h3>Failed to Load Courses</h3>
          <p className="error-message">{error}</p>
          <button
            className="btn-retry"
            onClick={loadCourses}
            type="button"
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Success State — shown when courses load successfully */}
      {!isLoading && !error && (
        <>
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
              Showing <strong>{filteredCourses.length}</strong> of {courses.length} courses
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
        </>
      )}
    </div>
  );
}

export default Courses;
