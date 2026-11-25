import { coursesData } from './coursesData';

/**
 * fetchCourses - Simulates asynchronous data loading with a Promise
 *
 * Concepts Demonstrated:
 * 1. Promise constructor: new Promise((resolve, reject) => { ... })
 * 2. setTimeout to simulate network delay (like a real API call)
 * 3. resolve(data) for successful data loading
 * 4. reject(error) for simulated failures
 * 5. This function is used in the Courses page to demonstrate:
 *    - Loading state (spinner shown while waiting)
 *    - Success state (data rendered)
 *    - Error state (error message shown)
 *    - Retry button (calls this function again)
 *
 * Why not a real API?
 * - No backend or external API is needed for this project.
 * - This local simulation is reliable and easy to explain in a viva.
 * - The same pattern works identically with fetch() or axios in real projects.
 */
export function fetchCourses() {
  return new Promise((resolve, reject) => {
    // Simulate network delay of 1-1.5 seconds
    const delay = 1000 + Math.random() * 500;

    setTimeout(() => {
      // Simulate a small chance of failure (10%) for demonstrating error handling
      // In a real app, this would be a network error or server error
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject(new Error('Failed to load courses. Please try again.'));
      } else {
        // Return a copy of the courses data (simulating API response)
        resolve([...coursesData]);
      }
    }, delay);
  });
}
