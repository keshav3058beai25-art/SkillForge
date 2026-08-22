import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import './Notes.css';

/**
 * Notes Page Component
 * 
 * Concepts Demonstrated:
 * 1. Functional Component & Forms
 * 2. Controlled Inputs with useState (title, selectedCourse, content)
 * 3. Form submission handling with event object (e.preventDefault())
 * 4. Form validation and error state management
 * 5. Persistent storage with window.localStorage and JSON methods
 * 6. URL query parameter parsing with useLocation()
 * 7. Array operations: filter() for searching & deleting, spread operator [...] for adding
 * 8. Conditional rendering for empty state and feedback messages
 */
function Notes() {
  const location = useLocation();

  // Parse course query param if user came from "Take Notes for this Course"
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') || coursesData[0].title;

  // Controlled Form State
  const [title, setTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');
  const [searchNotesQuery, setSearchNotesQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Initialize notes list from localStorage or default starter notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('skillforge_student_notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (error) {
        console.error('Error parsing notes from localStorage:', error);
      }
    }
    return [
      {
        id: 1,
        title: 'ES6 Destructuring Quick Summary',
        course: 'Modern JavaScript (ES6+)',
        content: 'Array destructuring uses bracket syntax: const [first, second] = arr. Object destructuring uses property names: const { id, title } = course.',
        createdAt: '2026-08-20'
      },
      {
        id: 2,
        title: 'React Hooks Core Rules',
        course: 'React.js Core Fundamentals',
        content: 'Only call hooks at the top level of functional components. Never call hooks inside loops, conditions, or nested functions.',
        createdAt: '2026-08-21'
      }
    ];
  });

  // 2. Save notes to localStorage whenever the notes array changes
  useEffect(() => {
    localStorage.setItem('skillforge_student_notes', JSON.stringify(notes));
  }, [notes]);

  // Update selected course if query parameter changes in URL
  useEffect(() => {
    const courseFromParam = queryParams.get('course');
    if (courseFromParam) {
      setSelectedCourse(courseFromParam);
    }
  }, [location.search]);

  // Handle Form Submission
  const handleAddNote = (e) => {
    e.preventDefault(); // Prevent default page refresh on form submit

    // Form Validation: Ensure title is not empty
    if (!title.trim()) {
      setFormError('Please enter a note title.');
      return;
    }

    // Form Validation: Ensure content is not empty
    if (!content.trim()) {
      setFormError('Please write some note content.');
      return;
    }

    // Create new note object
    const newNote = {
      id: Date.now(), // Generate unique ID using current timestamp
      title: title.trim(),
      course: selectedCourse,
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    // Prepend new note to the list using spread operator
    setNotes([newNote, ...notes]);

    // Reset Form Fields
    setTitle('');
    setContent('');
    setFormError('');
    setSuccessMessage('Note saved successfully! ✅');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle Note Deletion
  const handleDeleteNote = (idToDelete) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      const updatedNotes = notes.filter((note) => note.id !== idToDelete);
      setNotes(updatedNotes);
    }
  };

  // Filter notes by search keyword
  const filteredNotes = notes.filter((note) => {
    const query = searchNotesQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.course.toLowerCase().includes(query)
    );
  });

  return (
    <div className="notes-page page-container">
      {/* Header */}
      <header className="page-header">
        <span className="page-tag">📝 Student Notebook</span>
        <h1 className="page-title">Course Study Notes</h1>
        <p className="page-subtitle">
          Write down concepts, code snippets, and revision summaries. All notes are saved automatically in your browser.
        </p>
      </header>

      {/* Main Grid: Form on Left, Saved Notes on Right */}
      <div className="notes-layout-grid">
        {/* Left Column: Add Note Form */}
        <section className="note-form-card">
          <h2 className="card-heading">Add New Study Note</h2>

          {/* Validation Error Alert */}
          {formError && <div className="form-error-alert">{formError}</div>}

          {/* Success Alert */}
          {successMessage && (
            <div className="form-success-alert">{successMessage}</div>
          )}

          <form onSubmit={handleAddNote} className="note-form">
            <div className="form-group">
              <label htmlFor="note-title" className="form-label">
                Note Title <span className="required-star">*</span>
              </label>
              <input
                id="note-title"
                type="text"
                className="form-input"
                placeholder="e.g. JavaScript Closures & Scope"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (formError) setFormError('');
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="note-course" className="form-label">
                Associated Course Track
              </label>
              <select
                id="note-course"
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {coursesData.map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note-content" className="form-label">
                Note Content / Summary <span className="required-star">*</span>
              </label>
              <textarea
                id="note-content"
                rows="5"
                className="form-textarea"
                placeholder="Type your notes, formulas, syntax reminders, or interview questions..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (formError) setFormError('');
                }}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-note">
              ➕ Save Note
            </button>
          </form>
        </section>

        {/* Right Column: List of Saved Notes */}
        <section className="notes-list-section">
          <div className="notes-list-header">
            <h2 className="card-heading">
              Saved Notes ({notes.length})
            </h2>

            {notes.length > 0 && (
              <input
                type="text"
                className="notes-filter-input"
                placeholder="Filter saved notes..."
                value={searchNotesQuery}
                onChange={(e) => setSearchNotesQuery(e.target.value)}
              />
            )}
          </div>

          {filteredNotes.length > 0 ? (
            <div className="notes-cards-list">
              {filteredNotes.map((note) => (
                <article key={note.id} className="note-card">
                  <div className="note-card-header">
                    <span className="note-course-tag">{note.course}</span>
                    <span className="note-date">{note.createdAt}</span>
                  </div>

                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-content-body">{note.content}</p>

                  <div className="note-card-footer">
                    <button
                      className="btn-delete-note"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Delete this note"
                      type="button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-notes-box">
              <span className="empty-notes-icon">📒</span>
              <h3>No notes to display</h3>
              <p>
                {searchNotesQuery
                  ? `No notes matched "${searchNotesQuery}".`
                  : 'Start taking notes using the form to organize your study takeaways.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Notes;
