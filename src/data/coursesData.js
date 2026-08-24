// ==========================================================================
// SKILLFORGE - 4 CORE SUBJECT TRACKS (5-6 Topics per Course)
// ==========================================================================

export const coursesData = [
  {
    id: 1,
    title: "Modern JavaScript (ES6+)",
    category: "Frontend",
    duration: "4 Weeks",
    level: "Beginner to Intermediate",
    instructor: "Prof. Arvind Sharma",
    featured: true,
    description: "Master modern ES6+ syntax including let/const, arrow functions, destructuring, spread operator, Promises, and async/await.",
    overview: "This course builds a strong foundation in modern JavaScript. You will understand scope, master ES6 features, write asynchronous code with Promises and async/await, and prepare for modern frontend frameworks.",
    lessons: [
      { id: 101, title: "Variables: let, const & Block Scope", duration: "20 mins" },
      { id: 102, title: "Arrow Functions & Lexical 'this'", duration: "25 mins" },
      { id: 103, title: "Destructuring Objects and Arrays", duration: "30 mins" },
      { id: 104, title: "Spread and Rest Operators", duration: "25 mins" },
      { id: 105, title: "Array Methods: map, filter, reduce", duration: "35 mins" },
      { id: 106, title: "Promises, Fetch API & Async/Await", duration: "40 mins" }
    ]
  },
  {
    id: 2,
    title: "React.js Core Fundamentals",
    category: "Frontend",
    duration: "5 Weeks",
    level: "Intermediate",
    instructor: "Dr. Priya Sen",
    featured: true,
    description: "Learn functional components, JSX, Props, State, Hooks (useState, useEffect, useRef), lifting state up, and React Router.",
    overview: "Dive into the world of declarative UI development with React 18. Understand components, stateful reactivity, dynamic routing with React Router, and side-effects management.",
    lessons: [
      { id: 201, title: "Components, JSX & Virtual DOM", duration: "25 mins" },
      { id: 202, title: "Passing Data with Props & Composition", duration: "30 mins" },
      { id: 203, title: "Managing State with useState Hook", duration: "40 mins" },
      { id: 204, title: "Handling Events & Controlled Form Inputs", duration: "35 mins" },
      { id: 205, title: "Side Effects & Lifecycles with useEffect", duration: "45 mins" },
      { id: 206, title: "Single Page Routing with React Router v6", duration: "40 mins" }
    ]
  },
  {
    id: 3,
    title: "Semantic HTML5 & Modern CSS3",
    category: "Frontend",
    duration: "3 Weeks",
    level: "Beginner",
    instructor: "Prof. Rajesh Verma",
    featured: true,
    description: "Build responsive, accessible layouts using semantic HTML5 tags, CSS Box Model, Flexbox, CSS Grid, and media queries.",
    overview: "Learn the foundational languages of the web. Structure documents with meaningful HTML5 semantic elements and style them cleanly using modern CSS Box Model, Flexbox, and CSS Grid.",
    lessons: [
      { id: 301, title: "HTML5 Semantic Tags & Document Structure", duration: "20 mins" },
      { id: 302, title: "Understanding the CSS Box Model (Border-Box)", duration: "30 mins" },
      { id: 303, title: "Mastering Flexbox: Alignments & Axes", duration: "40 mins" },
      { id: 304, title: "Building Responsive Layouts with CSS Grid", duration: "45 mins" },
      { id: 305, title: "Responsive Design with CSS Media Queries", duration: "35 mins" },
      { id: 306, title: "CSS Variables (Custom Properties) & Themes", duration: "25 mins" }
    ]
  },
  {
    id: 4,
    title: "Data Structures & Algorithms with Python",
    category: "Computer Science",
    duration: "6 Weeks",
    level: "Intermediate",
    instructor: "Dr. Ananya Roy",
    featured: true,
    description: "Master Big-O analysis, Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, and Searching/Sorting algorithms.",
    overview: "Develop strong problem-solving skills with core computer science data structures. Understand time and space complexity analysis, recursion, linear data structures, and standard search/sort algorithms.",
    lessons: [
      { id: 401, title: "Big-O Notation: Time and Space Complexity", duration: "30 mins" },
      { id: 402, title: "Arrays & Dynamic Array Implementations", duration: "35 mins" },
      { id: 403, title: "Singly and Doubly Linked Lists", duration: "40 mins" },
      { id: 404, title: "Stacks, Queues, and Deque Operations", duration: "35 mins" },
      { id: 405, title: "Binary Search Trees & Traversal (Inorder)", duration: "50 mins" },
      { id: 406, title: "Sorting Algorithms: QuickSort and MergeSort", duration: "45 mins" }
    ]
  }
];

// Helper functions for easy consumption
export const getCourseById = (id) => {
  const numericId = Number(id);
  return coursesData.find((course) => course.id === numericId);
};

export const getFeaturedCourses = () => {
  return coursesData.filter((course) => course.featured);
};

export const getCategories = () => {
  const categories = coursesData.map((course) => course.category);
  return ["All", ...new Set(categories)];
};
