// ==========================================================================
// SKILLFORGE - 7 SUBJECT MCQs DATASET (4 Core Subjects)
// Exactly 7 Curated Multiple Choice Questions per Course Track with Full Explanations
// ==========================================================================

export const mcqDatabase = {
  // --------------------------------------------------------------------------
  // Course 1: Modern JavaScript (ES6+) - Exactly 7 Questions
  // --------------------------------------------------------------------------
  1: [
    {
      id: "js-1",
      topic: "Variables: let, const & Block Scope",
      question: "Which of the following correctly describes the difference between 'let' and 'var'?",
      code: `function testScope() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(x); // ?
  console.log(y); // ?
}`,
      options: [
        "'var' is function-scoped and accessible outside the if-block, while 'let' is block-scoped and throws a ReferenceError.",
        "'let' is hoisted with default value undefined, while 'var' enters the Temporal Dead Zone.",
        "Both 'var' and 'let' are block-scoped, so both console.log statements print undefined.",
        "'let' can be redeclared in the same scope, whereas 'var' cannot be redeclared."
      ],
      correctAnswer: 0,
      explanation: "'var' declarations are function-scoped, so 'x' is accessible anywhere inside testScope(). In contrast, 'let' is block-scoped, meaning 'y' only exists inside the if-block and throws a ReferenceError outside."
    },
    {
      id: "js-2",
      topic: "Arrow Functions & Lexical 'this'",
      question: "How does an arrow function determine its 'this' binding?",
      options: [
        "It binds 'this' dynamically to the object that invoked the function at runtime.",
        "It inherits 'this' lexically from the enclosing lexical execution context at the time of definition.",
        "It always sets 'this' to undefined in strict mode and window in non-strict mode.",
        "It allows re-binding of 'this' using .bind(), .call(), or .apply()."
      ],
      correctAnswer: 1,
      explanation: "Arrow functions do not define their own 'this' binding. Instead, they capture the 'this' value of the enclosing lexical scope where they are created."
    },
    {
      id: "js-3",
      topic: "Destructuring Objects and Arrays",
      question: "What is the output of the following destructuring code?",
      code: `const user = { name: 'Alice', age: 24 };
const { name, role = 'Student' } = user;
const [first, ...rest] = [10, 20, 30, 40];
console.log(role, rest.length);`,
      options: [
        "undefined 3",
        "'Student' 3",
        "'Student' 4",
        "null 3"
      ],
      correctAnswer: 1,
      explanation: "Because 'role' does not exist on the user object, it takes the default value 'Student'. The rest operator collects the remaining array items [20, 30, 40], which has a length of 3."
    },
    {
      id: "js-4",
      topic: "Spread and Rest Operators",
      question: "What is the result of cloning an object with the spread operator as shown below?",
      code: `const original = { a: 1, nested: { b: 2 } };
const clone = { ...original };
clone.a = 99;
clone.nested.b = 88;
console.log(original.a, original.nested.b);`,
      options: [
        "1 2",
        "99 88",
        "1 88",
        "99 2"
      ],
      correctAnswer: 2,
      explanation: "The spread operator performs a shallow copy. Primitive properties like 'a' are copied by value (so original.a remains 1), but nested objects are copied by reference, so mutating clone.nested.b also mutates original.nested.b."
    },
    {
      id: "js-5",
      topic: "Array Methods: map, filter, reduce",
      question: "What does the following array method chain return?",
      code: `const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .reduce((acc, curr) => acc + curr, 0);`,
      options: [
        "120",
        "60",
        "210",
        "240"
      ],
      correctAnswer: 0,
      explanation: "filter(n => n % 2 === 0) keeps even numbers [2, 4, 6]. map(n => n * 10) transforms them to [20, 40, 60]. reduce sums them up: 20 + 40 + 60 = 120."
    },
    {
      id: "js-6",
      topic: "Promises, Fetch API & Async/Await",
      question: "What does an async function in JavaScript always return?",
      options: [
        "The raw evaluated value directly without any wrapper.",
        "A Promise that resolves with the returned value (or rejects with an error).",
        "A generator object with .next() method.",
        "undefined if no explicit Promise constructor is used."
      ],
      correctAnswer: 1,
      explanation: "An async function always returns a Promise. If the function returns a value, JavaScript automatically wraps it in a resolved Promise (Promise.resolve(value))."
    },
    {
      id: "js-7",
      topic: "Event Loop & Asynchronous Execution",
      question: "In what order will the following code log messages to the console?",
      code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
      options: [
        "A, B, C, D",
        "A, D, B, C",
        "A, D, C, B",
        "A, C, D, B"
      ],
      correctAnswer: 2,
      explanation: "Synchronous code runs first ('A', 'D'). Then microtasks (Promise.then callback) are executed ('C'). Finally, macrotasks (setTimeout callback) run ('B'). Hence, the order is A, D, C, B."
    }
  ],

  // --------------------------------------------------------------------------
  // Course 2: React.js Core Fundamentals - Exactly 7 Questions
  // --------------------------------------------------------------------------
  2: [
    {
      id: "react-1",
      topic: "Components, JSX & Virtual DOM",
      question: "Why must JSX elements have a single root parent or be wrapped in a Fragment (<>...</>)?",
      options: [
        "Because CSS cannot style sibling elements without a parent container.",
        "Because JSX compiles to React.createElement(...) calls, which are JS expressions that must evaluate to a single object.",
        "Because the browser DOM parser does not support adjacent HTML elements.",
        "Because React Router only matches single DOM nodes."
      ],
      correctAnswer: 1,
      explanation: "JSX is syntactic sugar for React.createElement() function calls. A JavaScript function call can only return one single object value. Fragments allow grouping without adding extra DOM nodes."
    },
    {
      id: "react-2",
      topic: "Passing Data with Props & Composition",
      question: "Which statement accurately describes Props in React?",
      options: [
        "Props are mutable and owned internally by the child component.",
        "Props are read-only, immutable inputs passed from parent to child.",
        "Props can be modified directly by doing `props.name = 'New'` inside child components.",
        "Props only accept string values and cannot pass functions or objects."
      ],
      correctAnswer: 1,
      explanation: "Props are read-only and immutable. A child component must never modify its own props. If data changes, the parent should pass down new props or updater callbacks."
    },
    {
      id: "react-3",
      topic: "Managing State with useState Hook",
      question: "What is the recommended way to update state when the new value depends on the previous state?",
      code: `const [count, setCount] = useState(0);
// How should count be incremented safely?`,
      options: [
        "setCount(count + 1)",
        "setCount(prevCount => prevCount + 1)",
        "count = count + 1",
        "setCount(++count)"
      ],
      correctAnswer: 1,
      explanation: "Passing an updater function `setCount(prevCount => prevCount + 1)` ensures that you are working with the most up-to-date state even during batched asynchronous renders."
    },
    {
      id: "react-4",
      topic: "Handling Events & Controlled Form Inputs",
      question: "What makes an `<input>` a 'controlled component' in React?",
      options: [
        "Its value is controlled directly by the browser's DOM internal state.",
        "Its value is driven by React state and updated via an `onChange` event handler.",
        "It uses the `disabled` attribute to prevent user input.",
        "It uses a `ref` instead of state to read the value on form submit."
      ],
      correctAnswer: 1,
      explanation: "A controlled component has its value bound to React state (`value={state}`) and updates through an event handler (`onChange={(e) => setState(e.target.value)}`), making React the single source of truth."
    },
    {
      id: "react-5",
      topic: "Side Effects & Lifecycles with useEffect",
      question: "When will a useEffect hook with an empty dependency array `[]` run?",
      code: `useEffect(() => {
  console.log('Effect fired!');
}, []);`,
      options: [
        "On every single component render and re-render.",
        "Only once, immediately after the component mounts initially.",
        "Every time any state or prop variable in the component changes.",
        "Only when the component unmounts."
      ],
      correctAnswer: 1,
      explanation: "An empty dependency array `[]` tells React that the effect does not depend on any changing props or state, so it executes only once after the initial mount."
    },
    {
      id: "react-6",
      topic: "Single Page Routing with React Router v6",
      question: "In React Router v6, which hook is used to access dynamic URL route parameters (e.g. `:id` from `/courses/:id`)?",
      options: [
        "useNavigate()",
        "useLocation()",
        "useParams()",
        "useSearchParams()"
      ],
      correctAnswer: 2,
      explanation: "The `useParams()` hook returns an object of key/value pairs of dynamic parameters matched by the `<Route path=':paramName'>`."
    },
    {
      id: "react-7",
      topic: "Rules of Hooks & Virtual DOM",
      question: "Which of the following violates the fundamental Rules of Hooks in React?",
      options: [
        "Calling `useState` at the top level of a custom hook.",
        "Calling `useEffect` inside a conditional `if` statement.",
        "Calling `useRef` directly inside a React functional component body.",
        "Naming a custom hook starting with the prefix `use`."
      ],
      correctAnswer: 1,
      explanation: "Hooks must only be called at the top level of React functional components. You must never call Hooks inside loops, conditions, or nested functions so React can preserve state order across renders."
    }
  ],

  // --------------------------------------------------------------------------
  // Course 3: Semantic HTML5 & Modern CSS3 - Exactly 7 Questions
  // --------------------------------------------------------------------------
  3: [
    {
      id: "html-1",
      topic: "HTML5 Semantic Tags & Document Structure",
      question: "Which HTML5 semantic element is best suited for self-contained content such as a blog post or course card?",
      options: [
        "<section>",
        "<article>",
        "<aside>",
        "<main>"
      ],
      correctAnswer: 1,
      explanation: "The `<article>` element represents a complete, self-contained piece of content in a document (such as a blog post, product card, or forum post) that is independently distributable."
    },
    {
      id: "html-2",
      topic: "Understanding the CSS Box Model (Border-Box)",
      question: "What is the total computed width of an element with `box-sizing: border-box` when `width: 250px`, `padding: 20px`, and `border: 5px solid black`?",
      options: [
        "250px",
        "300px",
        "290px",
        "200px"
      ],
      correctAnswer: 0,
      explanation: "With `box-sizing: border-box`, padding and borders are absorbed inside the declared 250px width rather than expanding it, so the total width remains exactly 250px."
    },
    {
      id: "html-3",
      topic: "Mastering Flexbox: Alignments & Axes",
      question: "In CSS Flexbox, which property aligns flex items along the horizontal main axis when `flex-direction: row`?",
      options: [
        "align-items",
        "justify-content",
        "align-content",
        "flex-wrap"
      ],
      correctAnswer: 1,
      explanation: "`justify-content` aligns flex items along the main axis (horizontal when flex-direction is row; vertical when column). `align-items` aligns along the cross axis."
    },
    {
      id: "html-4",
      topic: "Building Responsive Layouts with CSS Grid",
      question: "What layout does `grid-template-columns: repeat(3, 1fr)` generate?",
      options: [
        "3 columns of equal width each taking 1 fraction (1fr) of available space.",
        "3 rows of 1 fraction unit with no columns.",
        "A fixed 300px grid layout.",
        "An auto-wrapping grid with 150px columns."
      ],
      correctAnswer: 0,
      explanation: "`repeat(3, 1fr)` defines 3 equal-width columns each occupying 1 fraction (1fr) of the available container width."
    },
    {
      id: "html-5",
      topic: "Responsive Design with CSS Media Queries",
      question: "Which CSS Media Query targets screens with a viewport width of 768px or less?",
      options: [
        "@media screen and (min-width: 768px)",
        "@media (max-width: 768px)",
        "@media only device (width < 768)",
        "@screen (max: 768px)"
      ],
      correctAnswer: 1,
      explanation: "`@media (max-width: 768px)` applies CSS rules when the viewport width is 768 pixels or narrower."
    },
    {
      id: "html-6",
      topic: "CSS Variables (Custom Properties) & Themes",
      question: "How do you declare and consume a CSS custom property (variable)?",
      options: [
        "$primary-color: #4f46e5; color: $primary-color;",
        "--primary-color: #4f46e5; color: var(--primary-color);",
        "@primary-color: #4f46e5; color: @primary-color;",
        "set(--primary, #4f46e5); color: get(--primary);"
      ],
      correctAnswer: 1,
      explanation: "CSS custom properties are declared with a double-dash prefix (`--primary-color: #4f46e5;`) and consumed using the `var()` function (`color: var(--primary-color);`)."
    },
    {
      id: "html-7",
      topic: "CSS Specificity & Transforms",
      question: "Which CSS property provides smooth hover scaling animations without causing expensive DOM layout reflows?",
      options: [
        "transition: width 0.3s; &:hover { width: 120%; }",
        "transition: transform 0.2s ease; &:hover { transform: scale(1.05); }",
        "transition: margin 0.5s; &:hover { margin: 10px; }",
        "position: absolute; top: 10px;"
      ],
      correctAnswer: 1,
      explanation: "CSS transforms (`transform: scale(...)`) and opacity are handled directly on the compositor thread via GPU acceleration, avoiding layout reflows and repaints."
    }
  ],

  // --------------------------------------------------------------------------
  // Course 4: Data Structures & Algorithms with Python - Exactly 7 Questions
  // --------------------------------------------------------------------------
  4: [
    {
      id: "dsa-1",
      topic: "Big-O Notation: Time and Space Complexity",
      question: "What is the average and worst-case time complexity of Binary Search on a sorted array of size n?",
      options: [
        "O(1) average, O(n) worst case",
        "O(log n) average, O(log n) worst case",
        "O(n) average, O(n log n) worst case",
        "O(n^2) average, O(n^2) worst case"
      ],
      correctAnswer: 1,
      explanation: "Binary search halves the search space in each comparison step (n -> n/2 -> n/4 -> ... -> 1). Therefore, both the average and worst-case time complexities are O(log n)."
    },
    {
      id: "dsa-2",
      topic: "Arrays & Dynamic Array Implementations",
      question: "What is the amortized time complexity of appending an element to a dynamic array (Python list)?",
      options: [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n^2)"
      ],
      correctAnswer: 2,
      explanation: "While resizing occasionally requires O(n) time, the amortized cost per append operation over a sequence of insertions is constant O(1)."
    },
    {
      id: "dsa-3",
      topic: "Singly and Doubly Linked Lists",
      question: "What is the time complexity of inserting a new node at the head of a Singly Linked List with a known head pointer?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      correctAnswer: 0,
      explanation: "Inserting at the head requires creating a node, pointing its next pointer to the current head, and updating the head pointer in constant O(1) time."
    },
    {
      id: "dsa-4",
      topic: "Stacks, Queues, and Deque Operations",
      question: "Which data structure follows the Last-In, First-Out (LIFO) principle?",
      options: [
        "Queue",
        "Stack",
        "Priority Queue",
        "Binary Tree"
      ],
      correctAnswer: 1,
      explanation: "A Stack operates on the LIFO (Last-In, First-Out) principle, where push and pop operations occur at the top of the stack."
    },
    {
      id: "dsa-5",
      topic: "Binary Search Trees & Traversal (Inorder)",
      question: "In a valid Binary Search Tree (BST), which tree traversal visits all node values in ascending sorted order?",
      options: [
        "Preorder Traversal (Root, Left, Right)",
        "Inorder Traversal (Left, Root, Right)",
        "Postorder Traversal (Left, Right, Root)",
        "Level-order Traversal (BFS)"
      ],
      correctAnswer: 1,
      explanation: "Inorder traversal visits Left Subtree -> Root -> Right Subtree. Since Left < Root < Right in a valid BST, inorder traversal produces strictly sorted order."
    },
    {
      id: "dsa-6",
      topic: "Sorting Algorithms: QuickSort and MergeSort",
      question: "Which sorting algorithm guarantees O(n log n) time complexity in all cases (best, average, and worst)?",
      options: [
        "QuickSort",
        "MergeSort",
        "Bubble Sort",
        "Insertion Sort"
      ],
      correctAnswer: 1,
      explanation: "MergeSort divides the array evenly in half at every level and merges them in linear time, guaranteeing O(n log n) time complexity in all cases (requiring O(n) auxiliary space)."
    },
    {
      id: "dsa-7",
      topic: "Hash Tables & Recursion",
      question: "What is the average time complexity of looking up a key in a Hash Table (Python Dictionary)?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 0,
      explanation: "On average, computing the hash function and retrieving the bucket in a hash table takes constant O(1) time."
    }
  ]
};

// Helper function to get MCQs by course ID
export const getMCQsByCourseId = (courseId) => {
  const numericId = Number(courseId);
  return mcqDatabase[numericId] || [];
};

// Helper function to get total questions count across all courses
export const getTotalQuestionsCount = () => {
  return Object.values(mcqDatabase).reduce(
    (acc, questions) => acc + questions.length,
    0
  );
};
