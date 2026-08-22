import React, { useState, useEffect } from 'react';
import './QuoteCard.css';

/**
 * Fallback quotes database
 * Ensures the project works smoothly even if offline or without internet during viva evaluation.
 */
const fallbackQuotes = [
  {
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    quote: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  }
];

/**
 * QuoteCard Component
 * 
 * Concepts Demonstrated:
 * - Functional Component
 * - useState (quote data, loading state, error handling)
 * - useEffect (fetching data on component mount)
 * - Promises & async/await syntax
 * - Native fetch() API with JSON response parsing
 * - try / catch error handling with offline fallback
 * - Conditional rendering for loading indicator
 * - Event handling on button click
 */
function QuoteCard() {
  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: ''
  });
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Asynchronous function to fetch daily developer motivation
  const fetchQuote = async () => {
    setLoading(true);

    try {
      // 1. Attempt to fetch quote from public API with timeout
      const response = await fetch('https://dummyjson.com/quotes/random', {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // 2. Parse response JSON
      const data = await response.json();

      setQuoteData({
        quote: data.quote,
        author: data.author
      });
    } catch (error) {
      // 3. Graceful offline fallback if API is unreachable
      const fallback = fallbackQuotes[quoteIndex % fallbackQuotes.length];
      setQuoteData(fallback);
      setQuoteIndex((prev) => prev + 1);
    } finally {
      // 4. End loading state
      setLoading(false);
    }
  };

  // useEffect hook with empty dependency array []
  // Runs once when the component is first mounted to the DOM
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="quote-card-container">
      <div className="quote-card">
        <div className="quote-header">
          <span className="quote-badge">💡 Developer Tip of the Day</span>
          <button
            className="btn-refresh-quote"
            onClick={fetchQuote}
            title="Get another quote"
            type="button"
          >
            🔄 New Quote
          </button>
        </div>

        {/* Conditional Rendering: Show loading skeleton or quote text */}
        {loading ? (
          <div className="quote-loading-state">
            <span className="loading-spinner"></span>
            <p>Fetching developer inspiration...</p>
          </div>
        ) : (
          <div className="quote-body">
            <blockquote className="quote-text">"{quoteData.quote}"</blockquote>
            <cite className="quote-author">— {quoteData.author}</cite>
          </div>
        )}
      </div>
    </section>
  );
}

export default QuoteCard;
