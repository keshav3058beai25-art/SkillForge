import React from 'react';
import './FormInput.css';

/**
 * FormInput - Reusable Input Component
 *
 * Concepts Demonstrated:
 * 1. Reusable component that accepts props (label, name, value, onChange, etc.)
 * 2. Controlled input: value comes from parent state, onChange updates parent state
 * 3. Conditional rendering: error message only shown when error prop is truthy
 * 4. Supports different input types: text, textarea, select
 * 5. Props with default values for flexibility
 *
 * Usage Example:
 *   <FormInput
 *     label="Note Title"
 *     name="title"
 *     value={title}
 *     onChange={(e) => setTitle(e.target.value)}
 *     placeholder="Enter title..."
 *     error={titleError}
 *     required
 *   />
 */
function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
  rows = 5,
  options = [],
}) {
  // Unique ID for accessibility (links label to input)
  const inputId = `form-input-${name}`;

  return (
    <div className={`form-input-group ${error ? 'has-error' : ''}`}>
      {/* Label with optional required indicator */}
      {label && (
        <label htmlFor={inputId} className="form-input-label">
          {label}
          {required && <span className="required-star"> *</span>}
        </label>
      )}

      {/* Render different input types based on the 'type' prop */}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          className="form-input-field form-textarea-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          name={name}
          className="form-input-field form-select-field"
          value={value}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          className="form-input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {/* Error message - only rendered when error is not empty */}
      {error && <span className="form-input-error">{error}</span>}
    </div>
  );
}

export default FormInput;
