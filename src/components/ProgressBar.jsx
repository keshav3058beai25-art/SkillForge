import React from 'react';
import './ProgressBar.css';

/**
 * ProgressBar Component
 * 
 * Concepts Demonstrated:
 * - Reusable functional component
 * - Props with default values
 * - Dynamic inline styles (dynamic width calculation)
 * - Conditional rendering of percentage label
 */
function ProgressBar({ value = 0, showLabel = true, height = '8px' }) {
  // Ensure value stays between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));

  // Determine progress color tone based on completion level
  let barColor = 'var(--primary-color, #4f46e5)';
  if (normalizedValue === 100) {
    barColor = 'var(--accent-success, #16a34a)';
  } else if (normalizedValue > 50) {
    barColor = '#0284c7';
  }

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${normalizedValue}%`,
            backgroundColor: barColor
          }}
        ></div>
      </div>
      {showLabel && (
        <div className="progress-label-row">
          <span className="progress-status-text">
            {normalizedValue === 100 ? 'Completed 🎉' : 'Progress'}
          </span>
          <span className="progress-percent-text">{normalizedValue}%</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
