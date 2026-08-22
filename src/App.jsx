import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/index.css';
import './styles/App.css';

// Reusable Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Progress from './pages/Progress';
import Notes from './pages/Notes';
import NotFound from './pages/NotFound';

/**
 * ScrollToTop Component
 * Ensures page scrolls to top on navigation.
 * Demonstrates: useEffect hook listening to route pathname changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main App Component
 * 
 * Concepts Demonstrated:
 * 1. React Router Single Page Application (SPA) routing with <Routes> & <Route>
 * 2. Lifting State Up: Global progress tracking state shared across Home, Courses, CourseDetails & Progress
 * 3. useState Hook: Storing the array of completed lesson IDs
 * 4. useEffect Hook & localStorage: Persisting user progress across browser reloads
 * 5. JSON.parse & JSON.stringify for data serialization
 * 6. Component Composition: Wrapping dynamic pages inside consistent Navbar and Footer
 */
function App() {
  // 1. Initialize completedLessons state from browser's localStorage (or default starter lessons)
  const [completedLessons, setCompletedLessons] = useState(() => {
    const savedLessons = localStorage.getItem('skillforge_completed_lessons');
    if (savedLessons) {
      try {
        return JSON.parse(savedLessons);
      } catch (error) {
        console.error('Error parsing completed lessons from localStorage:', error);
        return [101, 102, 201];
      }
    }
    // Default initial demo lessons (Modern JS 101, 102 and React 201 completed)
    return [101, 102, 201];
  });

  // 2. Save completedLessons to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem(
      'skillforge_completed_lessons',
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  // Handler to toggle completion status of a lesson (Add if not completed, Remove if already completed)
  const handleToggleLesson = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      // Remove lesson ID from array using filter()
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      // Add lesson ID to array using spread operator [...]
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Handler to reset all progress with confirmation dialog
  const handleResetProgress = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset all completed lessons?');
    if (isConfirmed) {
      setCompletedLessons([]);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="main-content">
          <Routes>
            {/* 1. Home Page */}
            <Route
              path="/"
              element={<Home completedLessons={completedLessons} />}
            />

            {/* 2. Courses Catalog */}
            <Route
              path="/courses"
              element={<Courses completedLessons={completedLessons} />}
            />

            {/* 3. Dynamic Course Details (uses :id route parameter) */}
            <Route
              path="/courses/:id"
              element={
                <CourseDetails
                  completedLessons={completedLessons}
                  onToggleLesson={handleToggleLesson}
                />
              }
            />

            {/* 4. Progress Dashboard */}
            <Route
              path="/progress"
              element={
                <Progress
                  completedLessons={completedLessons}
                  onResetProgress={handleResetProgress}
                />
              }
            />

            {/* 5. Study Notes Notebook */}
            <Route path="/notes" element={<Notes />} />

            {/* 6. 404 Catch-All Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
