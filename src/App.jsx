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
import QuizPage from './pages/QuizPage';
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
 * 2. Lifting State Up: Global progress tracking state shared across Home, Courses, CourseDetails, Quiz & Progress
 * 3. useState Hook: Storing the array of completed lesson IDs and quiz scores
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

  // 2. Initialize quizScores state from browser's localStorage
  const [quizScores, setQuizScores] = useState(() => {
    const savedScores = localStorage.getItem('skillforge_quiz_scores');
    if (savedScores) {
      try {
        return JSON.parse(savedScores);
      } catch (error) {
        console.error('Error parsing quiz scores from localStorage:', error);
        return {};
      }
    }
    return {};
  });

  // 3. Save completedLessons to localStorage whenever state updates
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

  // Handler for when a quiz is completed
  const handleQuizComplete = (updatedScores) => {
    setQuizScores(updatedScores);
  };

  // Handler to mark all lessons of a course completed when the 7 MCQs are passed
  const handleCompleteCourseLessons = (courseId) => {
    const numericId = Number(courseId);
    const course = coursesData.find((c) => c.id === numericId);
    if (!course) return;

    const courseLessonIds = course.lessons.map((l) => l.id);
    setCompletedLessons((prev) => {
      const updated = Array.from(new Set([...prev, ...courseLessonIds]));
      localStorage.setItem('skillforge_completed_lessons', JSON.stringify(updated));
      return updated;
    });
  };

  // Handler to reset all progress with confirmation dialog
  const handleResetProgress = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset all completed lessons and quiz scores?');
    if (isConfirmed) {
      setCompletedLessons([]);
      setQuizScores({});
      localStorage.removeItem('skillforge_quiz_scores');
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
                  onCompleteCourseLessons={handleCompleteCourseLessons}
                />
              }
            />

            {/* 4. Interactive Subject Quizzes & MCQs (7 Questions per track) */}
            <Route
              path="/quiz"
              element={
                <QuizPage
                  onQuizComplete={handleQuizComplete}
                  onCompleteCourseLessons={handleCompleteCourseLessons}
                />
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <QuizPage
                  onQuizComplete={handleQuizComplete}
                  onCompleteCourseLessons={handleCompleteCourseLessons}
                />
              }
            />

            {/* 5. Progress Dashboard */}
            <Route
              path="/progress"
              element={
                <Progress
                  completedLessons={completedLessons}
                  quizScores={quizScores}
                  onResetProgress={handleResetProgress}
                />
              }
            />

            {/* 6. Study Notes Notebook */}
            <Route path="/notes" element={<Notes />} />

            {/* 7. 404 Catch-All Page */}
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
