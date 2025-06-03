/**
 * This component creates a responsive particle animation background
 * 
 * Imports:
 * - React hooks for managing state and side effects
 * - Particles component from tsparticles library
 * - Types and utilities from the particle engine
 */

// React hooks for managing component state and lifecycle
import { useEffect, useMemo, useState, useCallback } from "react";

// The main Particles component and initialization function from tsparticles
import Particles, { initParticlesEngine } from "@tsparticles/react";

// Types and constants from the particles engine
import {
  type Container,        // Type for the particles container
  type ISourceOptions,   // Type for the configuration options
  MoveDirection,         // Constants for particle movement direction
  OutMode,               // Constants for what happens when particles reach the edge
} from "@tsparticles/engine";

// The slim version of the particles engine (smaller bundle size, fewer features)
import { loadSlim } from "@tsparticles/slim";

/**
 * Define standard screen size breakpoints for responsive design
 * - sm: Small screens (mobile phones)
 * - md: Medium screens (tablets)
 * - lg: Large screens (laptops)
 * - xl: Extra large screens (desktops)
 */
const breakpoints = {
  sm: 576,  // Mobile breakpoint in pixels
  md: 768,  // Tablet breakpoint in pixels
  lg: 992,  // Laptop breakpoint in pixels
  xl: 1200, // Desktop breakpoint in pixels
};

/**
 * TypeScript interface defining the props this component accepts
 * 
 * ? after a property name means it's optional (not required)
 * React.CSSProperties is a type that represents valid CSS properties
 */
interface ParticlesBackgroundProps {
  className?: string;              // Optional CSS class for the Particles component
  containerClassName?: string;     // Optional CSS class for the container div
  containerStyle?: React.CSSProperties; // Optional CSS styles for the container
}

/**
 * The main ParticlesBackground component
 * 
 * React.FC<ParticlesBackgroundProps> means:
 * - This is a Function Component (FC)
 * - It accepts props defined in ParticlesBackgroundProps interface
 * 
 * The destructuring ({ className, containerClassName, containerStyle }) extracts 
 * these values from the props object for easier use in the component
 */
const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  className,
  containerClassName,
  containerStyle
}) => {
  // State variables using React's useState hook:
  
  /**
   * Track whether the particles engine has been initialized
   * - init: current state value (boolean)
   * - setInit: function to update this state
   * - useState(false): initialize with value 'false'
   */
  const [init, setInit] = useState(false);
  
  /**
   * Track the window width for responsive adaptations
   * - Initial value is set to current window width
   */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  /**
   * This useEffect hook handles the window resize event
   * 
   * useEffect lets you perform side effects in functional components
   * Side effects include things like: API calls, DOM manipulation, subscriptions
   */
  useEffect(() => {
    // Define a function to update our state when window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Subscribe to the window's resize event
    window.addEventListener('resize', handleResize);
    
    // Return a cleanup function that runs when the component unmounts
    // This prevents memory leaks by removing the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Calculate how many particles to display based on screen size
   * 
   * useCallback is a React hook that memoizes a function to improve performance
   * It only recreates the function when one of its dependencies changes
   */
  const getParticlesCount = useCallback(() => {
    // Fewer particles on smaller screens for better performance
    if (windowWidth <= breakpoints.sm) return 50;   // Mobile
    if (windowWidth <= breakpoints.md) return 75;   // Tablet
    return 100;                                     // Desktop
  }, [windowWidth]); // Recalculate when windowWidth changes

  /**
   * Initialize the particles engine on component mount
   */
  useEffect(() => {
    // Initialize the tsparticles engine (this is async)
    initParticlesEngine(async (engine) => {
      // Load the slim version of the particles bundle
      // This is a smaller, more performant version with fewer features
      await loadSlim(engine);
    }).then(() => {
      // When initialization is complete, update our state
      setInit(true);
    });
  }, []); // Empty array means this runs once when component mounts
  
  /**
   * Force a resize event when window width changes or after initialization
   * This ensures particles respond to screen size changes
   */
  useEffect(() => {
    if (init) {
      // Find the particles container
      const container = document.getElementById("tsparticles");
      if (container) {
        // Create and dispatch a resize event to force particles to recalculate
        const event = new Event("resize");
        window.dispatchEvent(event);
      }
    }
  }, [windowWidth, init]); // Run when windowWidth or init state changes
  /**
   * Callback function that runs when particles are loaded
   * 
   * - async: this is an asynchronous function (can use await inside)
   * - container?: Optional parameter (might be undefined)
   * - Promise<void>: Returns a Promise that resolves to nothing (void)
   */
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles container loaded", container);
  };

  /**
   * Define the configuration options for the particles
   * 
   * useMemo is a React hook that memoizes a value calculation
   * It only recalculates when dependencies change, improving performance
   */
  const options: ISourceOptions = useMemo(
    () => ({
      // Background settings for the particles container
      background: {
        color: {
          value: "#0d47a1", // Blue background color
        },
      },
      
      // Frame rate limit to improve performance
      fpsLimit: 120,
      
      // Configure how users can interact with the particles
      interactivity: {
        events: {
          // What happens when clicking on the canvas
          onClick: {
            enable: false,       // Disable click interactions
            mode: "push",        // If enabled, would push particles away
          },
          // What happens when hovering over particles
          onHover: {
            enable: true,        // Enable hover interactions
            mode: "grab",        // Grab particles when hovering
          },
        },
        
        // Define different interaction modes
        modes: {
          // Push mode (used for clicks if enabled)
          push: {
            // Number of particles to push depends on screen size
            quantity: windowWidth <= breakpoints.sm ? 2 : 4,
          },
          // Repulse mode pushes particles away
          repulse: {
            // Distance affected by repulsion, smaller on mobile
            distance: windowWidth <= breakpoints.sm ? 100 : 200,
            duration: 0.4,  // Duration of the effect in seconds
          },
          // Grab mode (used for hover)
          grab: {
            // Distance within which particles can be grabbed
            distance: windowWidth <= breakpoints.sm ? 100 : windowWidth <= breakpoints.md ? 120 : 140,
            // Configure the connections that form when grabbing
            links: {
              opacity: 1,  // Full opacity for the connection lines
              // Thinner lines on mobile for better performance
              width: windowWidth <= breakpoints.sm ? 0.5 : 1
            },
          },
        },
      },      // Control whether particles take the full screen
      fullScreen: {
        enable: false, // Disable fullscreen mode to confine to container
      },
      
      // Configure the individual particles
      particles: {
        // Particle color
        color: {
          value: "#ffffff", // White particles
        },
        
        // Configure the links (lines) between particles
        links: {
          color: "#ffffff", // White links
          // Adjust connection distance based on screen size
          distance: windowWidth <= breakpoints.sm ? 140 : windowWidth <= breakpoints.md ? 145 : 150,
          enable: true,    // Enable links between particles
          opacity: 0.5,    // 50% opacity for subtle effect
          // Thinner links on mobile for better performance
          width: windowWidth <= breakpoints.sm ? 0.8 : 1,
        },
        
        // Configure how particles move
        move: {
          direction: MoveDirection.none, // No specific direction (random)
          enable: true,                  // Enable particle movement
          outModes: {
            default: OutMode.out, // Particles exit the canvas when they go beyond the edge
          },
          random: false,          // Movement is not random
          // Speed varies by screen size (slower on mobile for performance)
          speed: windowWidth <= breakpoints.sm ? 4 : windowWidth <= breakpoints.md ? 4 : 5,
          straight: false,        // Particles don't move in straight lines
        },
        
        // Configure particle quantity
        number: {
          density: {
            enable: true, // Enable density control
            // Adjust area based on screen size to keep particle density consistent
            // Smaller area = more concentrated particles
            area: windowWidth <= breakpoints.sm ? 800 : windowWidth <= breakpoints.md ? 900 : 1000
          },
          value: getParticlesCount(), // Use our responsive function for particle count
        },
        
        // Configure particle opacity
        opacity: {
          value: 0.5, // 50% opacity
        },
        
        // Configure particle shape
        shape: {
          type: "circle", // Use circular particles
        },
        
        // Configure particle size
        size: {
          value: { 
            // Smaller particles on mobile for better performance
            min: windowWidth <= breakpoints.sm ? 0.7 : 1, // Minimum size 
            max: windowWidth <= breakpoints.sm ? 4 : 5    // Maximum size
          },
        },
      },      // Enable retina display support for sharper rendering on high-DPI screens
      detectRetina: true,
      
      // Limit framerate on mobile to save battery and improve performance
      fps_limit: windowWidth <= breakpoints.sm ? 30 : 60, // 30fps on mobile, 60fps otherwise
    }),
    // Dependencies array - recalculate options when these values change
    [windowWidth, getParticlesCount]
  );

  /**
   * If the particles engine isn't initialized yet, don't render anything
   * This prevents errors from trying to use the engine before it's ready
   */
  if (!init) {
    return null;
  }

  /**
   * Define default container styles
   * 
   * React.CSSProperties is a TypeScript type for CSS properties
   * This ensures type safety for the style properties
   */
  const defaultContainerStyle: React.CSSProperties = {
    position: "relative",   // Positioning context for absolute children
    height: "100vh",        // 100% of viewport height
    width: "100vw",         // 100% of viewport width
    overflow: "hidden",     // Hide content that extends beyond container
    margin: 0,              // No margin
    padding: 0              // No padding
  };

  /**
   * Merge the default styles with any styles provided via props
   * The spread operator (...) copies all properties from the objects
   * Properties from containerStyle will override defaultContainerStyle if there are conflicts
   */
  const mergedContainerStyle = {
    ...defaultContainerStyle,
    ...containerStyle
  };
  /**
   * Render the ParticlesBackground component
   * 
   * The returned JSX represents what will be rendered to the DOM
   */
  return (
    <>
      {/* Container div with our merged styles and optional className */}
      <div className={containerClassName} style={mergedContainerStyle}>
        {/* The actual Particles component from tsparticles library */}
        <Particles
          id="tsparticles"                   // ID for the component (used for CSS and DOM access)
          className={className}              // Any custom CSS classes from props
          particlesLoaded={particlesLoaded}  // Callback when particles finish loading
          options={options}                  // All our configuration options
          style={{
            position: "absolute",  // Position absolutely within container
            top: 0,                // Align to top edge
            left: 0,               // Align to left edge
            right: 0,              // Align to right edge
            bottom: 0,             // Align to bottom edge
            width: "100%",         // Full width
            height: "100vh",       // Full viewport height
            margin: 0,             // No margin
            padding: 0             // No padding
          }}
        />
      </div>
      
      {/* 
       * Global CSS styles injected into the document
       * These apply to the entire app, not just this component
       * The <style> tag adds CSS directly to the document
       */}
      <style>
        {`
          /* Reset margins and ensure full-page coverage */
          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden;  /* Prevent horizontal scrolling */
            width: 100%;
            height: 100%;
          }
          
          /* Ensure the root element covers the full page */
          #root {
            width: 100%;
            height: 100%;
          }
          
          /* Target the particles container specifically */
          #tsparticles {
            width: 100% !important;       /* Force full width */
            height: 100vh !important;     /* Force full viewport height */
            position: absolute;           /* Position absolutely in container */
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
          }

          /* Target the canvas element created by the particles library */
          #tsparticles canvas {
            width: 100% !important;       /* Force full width */
            height: 100% !important;      /* Force full height */
          }
        `}
      </style>
    </>
  );
};

/**
 * Export the ParticlesBackground component as the default export
 * This allows other files to import it with:
 * import ParticlesBackground from "./components/ParticlesBackground";
 */
export default ParticlesBackground;
