import React, { useEffect } from 'react';
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
import QuizPage from './pages/QuizPage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
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
 * 1. React Router SPA routing with <Routes> & <Route>
 * 2. All global state is managed via Context API (AppContext)
 *    - No props are drilled from App to pages
 *    - Each page calls useApp() to read/write shared state
 * 3. Component Composition: Wrapping dynamic pages inside consistent Navbar and Footer
 * 4. Dynamic route parameters (:id) for CourseDetails and Quiz pages
 * 5. Catch-all 404 route for invalid URLs
 *
 * Why no state here?
 * - Previously, App.jsx had its own completedLessons and quizScores state AND
 *   AppContext had the same state separately. This caused data conflicts.
 * - Now ALL shared state lives in AppContext (src/context/AppContext.jsx).
 * - Pages use the useApp() hook to access context directly.
 */
function App() {
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
            <Route path="/" element={<Home />} />

            {/* 2. Dashboard (Mini-Project: Learning Dashboard) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* 3. Courses Catalog (with async loading) */}
            <Route path="/courses" element={<Courses />} />

            {/* 4. Dynamic Course Details (uses :id route parameter) */}
            <Route path="/courses/:id" element={<CourseDetails />} />

            {/* 5. Interactive Subject Quizzes & MCQs */}
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />

            {/* 6. Progress Analytics */}
            <Route path="/progress" element={<Progress />} />

            {/* 7. Study Notes Notebook */}
            <Route path="/notes" element={<Notes />} />

            {/* 8. About Page */}
            <Route path="/about" element={<About />} />

            {/* 9. Portfolio Page (Mini-Project: Portfolio Site) */}
            <Route path="/portfolio" element={<Portfolio />} />

            {/* 10. 404 Catch-All Page */}
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
