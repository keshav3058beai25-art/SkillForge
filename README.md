# SkillForge – Student Learning Dashboard 🎓
> **Front-End Engineering / CHO Evaluation 1 Project**  
> Built with **HTML5, CSS3, JavaScript ES6+, React.js (v18), React Router (v6), and Vite**.

---

## 📌 Project Overview
**SkillForge** is a clean, student-friendly, and responsive learning dashboard designed for college students to:
1. **Explore Curated Courses**: Browse structured technical courses covering Frontend, Backend, and Computer Science tracks.
2. **Track Syllabus Progress**: Check off completed lessons with dynamic real-time progress calculations.
3. **Manage Study Notes**: Write, filter, and persist revision notes and code snippets directly in the browser's `localStorage`.
4. **Daily Study Motivation**: Receive asynchronous study tips fetched dynamically via the `fetch()` API.

---

## 🛠️ Technology Stack & Evaluation Coverage

### 1. HTML5 (Semantic Structure)
- Uses semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, and `<form>`.
- Accessible form controls with explicit `<label>` tags and input validation attributes.

### 2. CSS3 (Modern Styling & Responsive Design)
- **Box Model**: Standardized sizing with `box-sizing: border-box`, controlled `margin`, `border`, and `padding`.
- **Flexbox**: Used for navigation alignment, badges, cards header/footer, and button groups.
- **CSS Grid**: Used for responsive card layouts (`courses-grid`, `features-grid`, `analytics-summary-grid`, `notes-layout-grid`).
- **CSS Custom Properties (Variables)**: Defined in `:root` (`--primary-color`, `--bg-body`, `--radius-lg`, etc.).
- **Media Queries**: Mobile-first responsive layouts supporting desktop, tablet, and mobile screens.

### 3. JavaScript ES6+ Concepts
- **Variables**: `let` and `const` (block scoping).
- **Functions**: Arrow functions `() => {}` and default parameter values.
- **Destructuring**: Object destructuring (`const { id, title } = course`) and array destructuring (`const [notes, setNotes] = useLocalStorage(...)`).
- **Spread & Rest**: Immutable array and state updates (`[...prev, lessonId]`, `[newNote, ...notes]`).
- **Array Methods**: `.map()`, `.filter()`, `.find()`, `.reduce()`, `.every()`.
- **Asynchronous JavaScript**: `async/await`, Promises, `try...catch...finally`, and the browser `fetch()` API.

### 4. React.js (v18) & Hooks
- **Components & JSX**: Declarative UI divided into reusable modular components.
- **Props**: Data and callback function passing between parents and children.
- **Lifting State Up**: Global lesson progress state managed in `App.jsx` and passed down to `Home`, `Courses`, `CourseDetails`, and `Progress`.
- **`useState`**: Handling local component state (search filters, form inputs, open/close menus, loading states).
- **`useEffect`**: Asynchronous data fetching (`QuoteCard`), URL scroll restoration (`ScrollToTop`), and localStorage synchronization.
- **`useRef`**: Programmatic input focusing for search input clearing and instant note taking.
- **`useMemo`**: Optimizing search and category filtering in `Courses.jsx`.
- **Custom Hook (`useLocalStorage`)**: Clean reusable hook encapsulating `useState` and `useEffect` with `window.localStorage`.

### 5. React Router (v6)
- `<BrowserRouter>`, `<Routes>`, `<Route>`
- `<NavLink>` with active class indicator (`nav-item-active`).
- Dynamic Routing: `/courses/:id` with `useParams()`.
- Programmatic Navigation: `useNavigate()` and `<Link>`.
- 404 Catch-All Route: `<Route path="*" element={<NotFound />} />`.

---

## 📂 Project Folder Structure

```text
d:/Project/
├── public/
│   └── quotes.json              # Static dataset for async fetch demonstration
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CourseCard.jsx       # Course summary card
│   │   ├── CourseCard.css
│   │   ├── Footer.jsx           # Semantic footer
│   │   ├── Footer.css
│   │   ├── Navbar.jsx           # Responsive header and navigation
│   │   ├── Navbar.css
│   │   ├── ProgressBar.jsx      # Reusable progress bar
│   │   ├── ProgressBar.css
│   │   ├── QuoteCard.jsx        # Async fetch tip component
│   │   └── QuoteCard.css
│   ├── pages/                   # Application pages (Routed)
│   │   ├── Home.jsx             # Hero, stats, features, featured courses
│   │   ├── Home.css
│   │   ├── Courses.jsx          # Catalog with search and category filters
│   │   ├── Courses.css
│   │   ├── CourseDetails.jsx    # Dynamic route (/courses/:id) with syllabus checklist
│   │   ├── CourseDetails.css
│   │   ├── Progress.jsx         # Learning analytics & milestone badges
│   │   ├── Progress.css
│   │   ├── Notes.jsx            # Controlled form with localStorage notes
│   │   ├── Notes.css
│   │   ├── NotFound.jsx         # 404 error page
│   │   └── NotFound.css
│   ├── data/
│   │   └── coursesData.js       # Structured college courses dataset
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for localStorage persistence
│   ├── styles/
│   │   ├── App.css              # App layout wrappers
│   │   └── index.css            # Global CSS variables & resets
│   ├── App.jsx                  # Main routing & lifted state manager
│   └── main.jsx                 # React root entry point
├── index.html                   # HTML5 template
├── package.json                 # Project dependencies & scripts
└── vite.config.js               # Vite bundler configuration
```

---

## 🚀 Running the Project Locally

1. **Install Dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🎓 Evaluation Viva Q&A Cheat Sheet

**Q1: How does the application maintain data persistence without a database?**  
> *Answer:* We use a custom React hook `useLocalStorage` which synchronizes React component state with the browser's built-in `window.localStorage` API using `JSON.stringify` on update and `JSON.parse` on initial state read.

**Q2: What is "Lifting State Up" and where is it used here?**  
> *Answer:* In `App.jsx`, we keep the `completedLessons` state at the root level so that multiple sibling routes (`Home`, `Courses`, `CourseDetails`, `Progress`) can read and update the same progress data without needing Redux or complex context.

**Q3: How does dynamic routing work in `/courses/:id`?**  
> *Answer:* We define `<Route path="/courses/:id" element={<CourseDetails ... />} />` in `App.jsx`. In `CourseDetails.jsx`, we call `useParams()` to extract `id` from the URL, and use `coursesData.find(...)` to render the matching course.

**Q4: How is asynchronous JavaScript demonstrated?**  
> *Answer:* In `QuoteCard.jsx`, `useEffect` executes an `async` function that uses `fetch('/quotes.json')` with `await response.json()`, handling loading and error states.
