import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Demonstrates:
 * 1. useState initialized with a lazy function reading from window.localStorage
 * 2. useEffect updating localStorage whenever the value or key changes
 * 3. JSON.stringify and JSON.parse for structured object/array persistence
 */
export function useLocalStorage(key, initialValue) {
  // 1. Initialize state from localStorage or use the provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Synchronize changes to localStorage on state change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
