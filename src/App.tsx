/**
 * Main App Component
 * 
 * This file serves as the entry point of our application.
 * It's a simple component that just renders the ParticlesBackground component.
 */

// Import the ParticlesBackground component from our components directory
import ParticlesBackground from "./components/ParticlesBackground";

/**
 * App Component
 * 
 * This is a function component in React. In React, components are functions that:
 * 1. Take props (properties) as input
 * 2. Return JSX (React's syntax extension for JavaScript that looks like HTML)
 * 
 * This particular component is extremely simple - it just renders our
 * ParticlesBackground component with no additional props or configuration.
 * 
 * The "() => {}" syntax is an arrow function in JavaScript.
 */
const App = () => {
  // Return JSX that will be rendered to the DOM
  return <ParticlesBackground />;
};

/**
 * Export the App component as the default export
 * 
 * This makes the component available to other files that import from this file.
 * In particular, main.tsx imports this component to render it to the DOM.
 */
export default App;