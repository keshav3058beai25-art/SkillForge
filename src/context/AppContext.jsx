import React, { createContext, useContext, useState, useEffect } from 'react';
import { coursesData } from '../data/coursesData';

/**
 * AppContext - Global State Management using React Context API
 *
 * Concepts Demonstrated:
 * 1. createContext() creates a Context object for sharing data across components
 * 2. Context Provider wraps the component tree and passes value={{ ... }} to all consumers
 * 3. useContext(AppContext) hook lets any child component read the shared state
 * 4. useState manages the actual state values (completedLessons, quizScores, notes)
 * 5. useEffect syncs state changes to localStorage for persistence
 *
 * Why Context API instead of prop drilling?
 * - Without Context, we had to pass completedLessons, quizScores, and handler functions
 *   through App -> Home, App -> Courses, App -> Progress, etc. as props.
 * - With Context, any component can directly access the shared state using useContext().
 * - This avoids passing props through intermediate components that don't need them.
 */

// 1. Create the Context object
const AppContext = createContext();

/**
 * Custom hook to consume the AppContext.
 * Any component can call useApp() to get access to global state.
 * Example: const { completedLessons, notes } = useApp();
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

/**
 * AppProvider Component
 * Wraps the entire app and provides global state to all child components.
 */
export function AppProvider({ children }) {
  // =========================================================================
  // STATE 1: Completed Lessons (array of lesson IDs)
  // Initialized from localStorage or with default demo values
  // =========================================================================
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('skillforge_completed_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing completed lessons:', error);
        return [101, 102, 201];
      }
    }
    return [101, 102, 201]; // Default: JS lessons 101, 102 and React lesson 201
  });

  // =========================================================================
  // STATE 2: Quiz Scores (object keyed by course ID)
  // =========================================================================
  const [quizScores, setQuizScores] = useState(() => {
    const saved = localStorage.getItem('skillforge_quiz_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing quiz scores:', error);
        return {};
      }
    }
    return {};
  });

  // =========================================================================
  // STATE 3: Study Notes (array of note objects)
  // =========================================================================
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('skillforge_student_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing notes:', error);
      }
    }
    return [
      {
        id: 1,
        title: 'ES6 Destructuring Quick Summary',
        course: 'Modern JavaScript (ES6+)',
        content:
          'Array destructuring uses bracket syntax: const [first, second] = arr. Object destructuring uses property names: const { id, title } = course.',
        createdAt: '2026-08-20',
      },
      {
        id: 2,
        title: 'React Hooks Core Rules',
        course: 'React.js Core Fundamentals',
        content:
          'Only call hooks at the top level of functional components. Never call hooks inside loops, conditions, or nested functions.',
        createdAt: '2026-08-21',
      },
    ];
  });

  // =========================================================================
  // STATE 4: Enrolled Courses (array of course IDs)
  // Tracks which courses the student has enrolled in.
  // Global state: shared between Courses page, Progress page, Dashboard.
  // =========================================================================
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('skillforge_enrolled_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (error) {
        console.error('Error parsing enrolled courses:', error);
      }
    }
    return [1, 2]; // Default: enrolled in JS and React courses
  });

  // =========================================================================
  // PERSIST STATE TO LOCALSTORAGE
  // useEffect runs whenever the dependency array values change
  // =========================================================================
  useEffect(() => {
    localStorage.setItem(
      'skillforge_completed_lessons',
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(
      'skillforge_quiz_scores',
      JSON.stringify(quizScores)
    );
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem(
      'skillforge_student_notes',
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      'skillforge_enrolled_courses',
      JSON.stringify(enrolledCourses)
    );
  }, [enrolledCourses]);

  // =========================================================================
  // HANDLER FUNCTIONS (shared across pages via context)
  // =========================================================================

  /** Toggle a lesson's completion status */
  const handleToggleLesson = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  /** Called when a quiz is completed - updates quiz scores */
  const handleQuizComplete = (updatedScores) => {
    setQuizScores(updatedScores);
  };

  /** Mark all lessons of a course as completed (after passing MCQs) */
  const handleCompleteCourseLessons = (courseId) => {
    const numericId = Number(courseId);
    const course = coursesData.find((c) => c.id === numericId);
    if (!course) return;

    const courseLessonIds = course.lessons.map((l) => l.id);
    setCompletedLessons((prev) => {
      const updated = Array.from(new Set([...prev, ...courseLessonIds]));
      return updated;
    });
  };

  /** Reset all progress (lessons + quiz scores) with confirmation */
  const handleResetProgress = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to reset all completed lessons and quiz scores?'
    );
    if (isConfirmed) {
      setCompletedLessons([]);
      setQuizScores({});
    }
  };

  /** Enroll in a course (adds course ID to enrolledCourses) */
  const enrollCourse = (courseId) => {
    const numericId = Number(courseId);
    setEnrolledCourses((prev) => {
      if (prev.includes(numericId)) return prev; // already enrolled
      return [...prev, numericId];
    });
  };

  /** Unenroll from a course */
  const unenrollCourse = (courseId) => {
    const numericId = Number(courseId);
    setEnrolledCourses((prev) => prev.filter((id) => id !== numericId));
  };

  /** Check if a course is enrolled */
  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.includes(Number(courseId));
  };

  /** Add a new note */
  const addNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  /** Update an existing note by ID */
  const updateNote = (noteId, updatedFields) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, ...updatedFields } : note
      )
    );
  };

  /** Delete a note by ID */
  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  // =========================================================================
  // DERIVED VALUES (calculated from state, useful for Dashboard)
  // These update automatically whenever the underlying state changes.
  // =========================================================================
  const totalCourses = coursesData.length;

  const totalLessons = coursesData.reduce(
    (acc, course) => acc + course.lessons.length,
    0
  );

  const completedCoursesCount = coursesData.filter((course) =>
    course.lessons.every((lesson) => completedLessons.includes(lesson.id))
  ).length;

  const overallProgress =
    totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

  const notesCount = notes.length;
  const enrolledCount = enrolledCourses.length;

  // =========================================================================
  // CONTEXT VALUE - everything exposed to child components
  // =========================================================================
  const contextValue = {
    // State
    completedLessons,
    quizScores,
    notes,
    enrolledCourses,

    // Handlers
    handleToggleLesson,
    handleQuizComplete,
    handleCompleteCourseLessons,
    handleResetProgress,
    enrollCourse,
    unenrollCourse,
    isCourseEnrolled,
    addNote,
    updateNote,
    deleteNote,

    // Derived values for Dashboard
    totalCourses,
    totalLessons,
    completedCoursesCount,
    overallProgress,
    notesCount,
    enrolledCount,
  };

  // 2. Provide the context value to all children
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
