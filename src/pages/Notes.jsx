import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { useApp } from '../context/AppContext';
import FormInput from '../components/FormInput';
import './Notes.css';

/**
 * Notes Page Component
 *
 * Concepts Demonstrated:
 * 1. useContext via useApp() to read/write notes in global state
 *    - addNote() adds to global context → Dashboard notesCount updates automatically
 *    - updateNote() edits an existing note in global context
 *    - deleteNote() removes from global context → reflected everywhere
 * 2. Reusable FormInput component for controlled inputs (text, textarea, select)
 * 3. Controlled Inputs with useState (title, selectedCourse, content)
 * 4. Form submission handling with event object (e.preventDefault())
 * 5. Form validation: required fields, minimum length checks
 * 6. Error messages and success feedback
 * 7. URL query parameter parsing with useLocation()
 * 8. Array operations: filter() for searching, spread operator [...] for adding
 * 9. Conditional rendering for empty state and feedback messages
 * 10. Edit mode: populate form with existing note data, update on save
 *
 * Global State vs Local State:
 * - notes, addNote, updateNote, deleteNote → Global (from AppContext, shared with Dashboard)
 * - title, selectedCourse, content, formErrors → Local (only this component needs them)
 * - searchNotesQuery, successMessage, editingNoteId → Local (UI state for this page only)
 */
function Notes() {
  const location = useLocation();

  // Global state from context (shared across pages)
  const { notes, addNote, updateNote, deleteNote } = useApp();

  // Parse course query param if user came from "Take Notes for this Course"
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') || coursesData[0].title;

  // Local form state (only needed by this component)
  const [title, setTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [content, setContent] = useState('');
  const [formErrors, setFormErrors] = useState({});  // Per-field error messages
  const [searchNotesQuery, setSearchNotesQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Edit mode state: tracks which note is being edited (null = add mode)
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Update selected course if query parameter changes in URL
  useEffect(() => {
    const courseFromParam = queryParams.get('course');
    if (courseFromParam) {
      setSelectedCourse(courseFromParam);
    }
  }, [location.search]);

  // Course options for the FormInput select component
  const courseOptions = coursesData.map((course) => ({
    value: course.title,
    label: course.title,
  }));

  /**
   * Validate form fields before submission
   * Returns an object with field-specific error messages
   */
  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = 'Please enter a note title.';
    } else if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long.';
    }

    if (!content.trim()) {
      errors.content = 'Please write some note content.';
    } else if (content.trim().length < 10) {
      errors.content = 'Content must be at least 10 characters long.';
    }

    return errors;
  };

  // Handle Form Submission (Add or Edit)
  const handleSubmitNote = (e) => {
    e.preventDefault(); // Prevent default page refresh on form submit

    // Run validation
    const errors = validateForm();
    setFormErrors(errors);

    // If there are any errors, stop submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (editingNoteId) {
      // Edit mode: update existing note via context
      updateNote(editingNoteId, {
        title: title.trim(),
        course: selectedCourse,
        content: content.trim(),
      });
      setSuccessMessage('Note updated successfully! ✅');
      setEditingNoteId(null);
    } else {
      // Add mode: create new note object
      const newNote = {
        id: Date.now(), // Generate unique ID using current timestamp
        title: title.trim(),
        course: selectedCourse,
        content: content.trim(),
        createdAt: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
      };

      // Add note via context (updates global state → Dashboard auto-updates)
      addNote(newNote);
      setSuccessMessage('Note saved successfully! ✅');
    }

    // Reset Form Fields
    setTitle('');
    setContent('');
    setFormErrors({});

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle Edit button click — populate form with note data
  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setSelectedCourse(note.course);
    setContent(note.content);
    setFormErrors({});
    setSuccessMessage('');

    // Scroll to the form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setTitle('');
    setContent('');
    setFormErrors({});
  };

  // Handle Note Deletion (via context)
  const handleDeleteNote = (idToDelete) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      deleteNote(idToDelete);
      // If we were editing this note, exit edit mode
      if (editingNoteId === idToDelete) {
        handleCancelEdit();
      }
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
        {/* Left Column: Add/Edit Note Form (uses reusable FormInput component) */}
        <section className="note-form-card">
          <h2 className="card-heading">
            {editingNoteId ? '✏️ Edit Note' : 'Add New Study Note'}
          </h2>

          {/* Success Alert */}
          {successMessage && (
            <div className="form-success-alert">{successMessage}</div>
          )}

          <form onSubmit={handleSubmitNote} className="note-form">
            {/* Reusable FormInput: Text input for title */}
            <FormInput
              label="Note Title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Clear title error when user starts typing
                if (formErrors.title) {
                  setFormErrors((prev) => ({ ...prev, title: '' }));
                }
              }}
              placeholder="e.g. JavaScript Closures & Scope"
              error={formErrors.title}
              required
            />

            {/* Reusable FormInput: Select dropdown for course */}
            <FormInput
              label="Associated Course Track"
              name="course"
              type="select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              options={courseOptions}
            />

            {/* Reusable FormInput: Textarea for content */}
            <FormInput
              label="Note Content / Summary"
              name="content"
              type="textarea"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                // Clear content error when user starts typing
                if (formErrors.content) {
                  setFormErrors((prev) => ({ ...prev, content: '' }));
                }
              }}
              placeholder="Type your notes, formulas, syntax reminders, or interview questions..."
              error={formErrors.content}
              required
              rows={5}
            />

            <div className="note-form-actions">
              <button type="submit" className="btn-submit-note">
                {editingNoteId ? '💾 Update Note' : '➕ Save Note'}
              </button>

              {/* Cancel button shown only in edit mode */}
              {editingNoteId && (
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
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
                <article
                  key={note.id}
                  className={`note-card ${editingNoteId === note.id ? 'note-card-editing' : ''}`}
                >
                  <div className="note-card-header">
                    <span className="note-course-tag">{note.course}</span>
                    <span className="note-date">{note.createdAt}</span>
                  </div>

                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-content-body">{note.content}</p>

                  <div className="note-card-footer">
                    <button
                      className="btn-edit-note"
                      onClick={() => handleEditNote(note)}
                      title="Edit this note"
                      type="button"
                    >
                      ✏️ Edit
                    </button>
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
