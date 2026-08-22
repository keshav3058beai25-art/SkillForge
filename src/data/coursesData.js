// ==========================================================================
// SKILLFORGE - COURSES DATASET (CHO Evaluation 1 Level)
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
    overview: "This course builds a strong foundation in modern JavaScript. You will understand how the JavaScript runtime works, master ES6 features, write asynchronous code with Promises and async/await, and prepare for modern frontend frameworks.",
    lessons: [
      { id: 101, title: "Variables: let, const & Block Scope", duration: "20 mins" },
      { id: 102, title: "Arrow Functions & Lexical 'this'", duration: "25 mins" },
      { id: 103, title: "Destructuring Objects and Arrays", duration: "30 mins" },
      { id: 104, title: "Spread and Rest Operators", duration: "25 mins" },
      { id: 105, title: "Array Methods: map, filter, reduce & find", duration: "35 mins" },
      { id: 106, title: "Template Literals & String Methods", duration: "15 mins" },
      { id: 107, title: "Asynchronous JS: Promises & Fetch API", duration: "40 mins" },
      { id: 108, title: "Async/Await & Error Handling with try/catch", duration: "30 mins" }
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
    overview: "Dive into the world of declarative UI development with React 18. Understand components, stateful reactivity, dynamic routing with React Router, controlled forms, and writing custom hooks.",
    lessons: [
      { id: 201, title: "Introduction to React & Virtual DOM", duration: "25 mins" },
      { id: 202, title: "Creating Components & JSX Syntax Rules", duration: "30 mins" },
      { id: 203, title: "Passing Data with Props & Component Composition", duration: "35 mins" },
      { id: 204, title: "Managing State with useState Hook", duration: "40 mins" },
      { id: 205, title: "Handling Events & Controlled Form Inputs", duration: "35 mins" },
      { id: 206, title: "Side Effects & Data Fetching with useEffect", duration: "45 mins" },
      { id: 207, title: "Direct DOM Access with useRef", duration: "20 mins" },
      { id: 208, title: "Single Page Routing with React Router v6", duration: "40 mins" }
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
    overview: "Learn the foundational languages of the web. Structure documents with meaningful HTML5 semantic elements and style them cleanly using modern CSS Box Model principles, Flexbox alignment, CSS Grid, and responsive viewport design.",
    lessons: [
      { id: 301, title: "HTML5 Semantic Tags: header, nav, main, section, footer", duration: "20 mins" },
      { id: 302, title: "Understanding the CSS Box Model (Margin, Border, Padding, Content)", duration: "30 mins" },
      { id: 303, title: "Mastering Flexbox: Alignments, Axes, and Wrapping", duration: "40 mins" },
      { id: 304, title: "Building Layouts with CSS Grid System", duration: "45 mins" },
      { id: 305, title: "Responsive Web Design with CSS Media Queries", duration: "35 mins" },
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
    featured: false,
    description: "Master Big-O analysis, Arrays, Linked Lists, Stacks, Queues, Binary Trees, and Searching/Sorting algorithms.",
    overview: "Develop strong problem-solving skills with core computer science data structures. Understand time and space complexity analysis, recursion, linear and non-linear data structures, and standard traversal algorithms.",
    lessons: [
      { id: 401, title: "Big-O Notation: Time and Space Complexity", duration: "30 mins" },
      { id: 402, title: "Arrays & Dynamic Array Implementations", duration: "35 mins" },
      { id: 403, title: "Singly and Doubly Linked Lists", duration: "40 mins" },
      { id: 404, title: "Stacks, Queues, and Deque Operations", duration: "35 mins" },
      { id: 405, title: "Binary Search Trees & Traversal (Inorder, Preorder, Postorder)", duration: "50 mins" },
      { id: 406, title: "Sorting Algorithms: QuickSort and MergeSort", duration: "45 mins" }
    ]
  },
  {
    id: 5,
    title: "Database Management & SQL Queries",
    category: "Backend",
    duration: "4 Weeks",
    level: "Beginner to Intermediate",
    instructor: "Prof. Amit Joshi",
    featured: false,
    description: "Learn relational database concepts, ER diagrams, normalization, SQL SELECT queries, JOINs, and aggregation.",
    overview: "Understand relational databases from foundational concepts to advanced queries. Design normalized database schemas, write multi-table JOIN queries, group data with aggregate functions, and ensure data integrity.",
    lessons: [
      { id: 501, title: "Relational Database Concepts & Schema Design", duration: "25 mins" },
      { id: 502, title: "DDL & DML: CREATE, INSERT, UPDATE, DELETE", duration: "30 mins" },
      { id: 503, title: "Filtering & Sorting with WHERE, ORDER BY, and LIMIT", duration: "25 mins" },
      { id: 504, title: "Aggregate Functions: COUNT, SUM, AVG, GROUP BY & HAVING", duration: "35 mins" },
      { id: 505, title: "Table Relationships & SQL JOINs (INNER, LEFT, RIGHT, FULL)", duration: "45 mins" },
      { id: 506, title: "Database Normalization (1NF, 2NF, 3NF, BCNF)", duration: "40 mins" }
    ]
  },
  {
    id: 6,
    title: "Core Java Programming",
    category: "Backend",
    duration: "5 Weeks",
    level: "Beginner",
    instructor: "Dr. K. S. Nair",
    featured: false,
    description: "Master Object-Oriented Programming (OOP), Classes, Inheritance, Polymorphism, Interfaces, and Exception Handling in Java.",
    overview: "Build reliable applications using the Java programming language. Grasp core OOP pillars (Encapsulation, Inheritance, Polymorphism, Abstraction), JVM memory architecture, packages, and the Java Collections Framework.",
    lessons: [
      { id: 601, title: "Java Architecture, JVM, JRE, and JDK", duration: "20 mins" },
      { id: 602, title: "Classes, Objects, Constructors & 'this' Keyword", duration: "35 mins" },
      { id: 603, title: "OOP Pillars: Encapsulation & Inheritance", duration: "40 mins" },
      { id: 604, title: "Polymorphism: Method Overloading & Overriding", duration: "35 mins" },
      { id: 605, title: "Abstract Classes, Interfaces & Multiple Inheritance", duration: "40 mins" },
      { id: 606, title: "Exception Handling with try-catch-finally & throw", duration: "35 mins" }
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
