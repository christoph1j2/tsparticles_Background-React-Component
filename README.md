# TSParticles React Background

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![tsParticles](https://img.shields.io/badge/tsParticles-3.8.1-1E65BC)](https://particles.js.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)](https://vitejs.dev/)

A highly customizable, responsive, and modular implementation of tsParticles as a React component. Perfect for creating interactive and visually appealing particle-based backgrounds in your React applications.

![TSParticles Demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/_media/demo.gif)

## ✨ Features

- 🎨 **Highly Customizable** - Configure colors, shapes, density, and more
- 📱 **Fully Responsive** - Adapts to all screen sizes and devices
- 🚀 **Performance Optimized** - Dynamic adjustments for different devices
- 🧩 **Modular Design** - Easy to integrate into any React project
- 🔌 **Interactive Elements** - Mouse hover and click interactions
- 🔋 **Battery-friendly** - Reduced frame rates on mobile devices
- 💪 **TypeScript Support** - Full type safety with TypeScript interfaces

## 📦 Installation

```bash
# npm
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim

# yarn
yarn add @tsparticles/react @tsparticles/engine @tsparticles/slim

# pnpm
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## 🚀 Quick Start

```tsx
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

const App = () => {
  return (
    <div className="app">
      <ParticlesBackground />
      <div className="content" style={{ position: 'relative', zIndex: 10 }}>
        <h1>Your App Content</h1>
        {/* Your app content goes here */}
      </div>
    </div>
  );
};

export default App;
```

## 📱 Usage Examples

### Landing Page Hero Section

```tsx
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero section with particles background */}
      <section className="hero" style={{ position: 'relative', height: '100vh' }}>
        <ParticlesBackground />
        
        {/* Content positioned above particles with z-index */}
        <div className="hero-content" style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center',
          padding: '20vh 2rem'
        }}>
          <h1>Welcome to Our Platform</h1>
          <p>A next-generation solution with beautiful UI</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
      
      {/* Rest of landing page content */}
      <section className="features">
        {/* Features content */}
      </section>
    </div>
  );
};

### Dynamic Theme Switcher

Here's an example of creating a theme switcher component that changes the particles configuration:

```tsx
import React, { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Container, ISourceOptions } from '@tsparticles/engine';

// Preset theme configurations
const themes = {
  light: {
    background: { color: { value: '#f8f9fa' } },
    particles: {
      color: { value: '#0d6efd' },
      links: { color: '#0d6efd', opacity: 0.4 }
    }
  },
  dark: {
    background: { color: { value: '#212529' } },
    particles: {
      color: { value: '#6ea8fe' },
      links: { color: '#6ea8fe', opacity: 0.4 }
    }
  },
  sunset: {
    background: { color: { value: '#ff7e5f' } },
    particles: {
      color: { value: '#feb47b' },
      links: { color: '#ffffff', opacity: 0.3 }
    }
  }
};

const ThemeSwitcher = () => {
  const [init, setInit] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'sunset'>('dark');

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Base configuration with theme-specific overrides
  const getOptions = (): ISourceOptions => {
    // Base configuration
    const baseOptions: ISourceOptions = {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.5 } },
          push: { quantity: 4 }
        }
      },
      particles: {
        move: {
          enable: true,
          speed: 3
        },
        links: {
          enable: true,
          distance: 150,
          width: 1
        },
        number: {
          value: 80,
          density: { enable: true, area: 800 }
        },
        size: {
          value: { min: 1, max: 3 }
        },
        opacity: {
          value: 0.6
        }
      },
      detectRetina: true,
      fullScreen: {
        enable: false
      }
    };

    // Merge base options with theme-specific options
    return {
      ...baseOptions,
      background: themes[currentTheme].background,
      particles: {
        ...baseOptions.particles,
        color: themes[currentTheme].particles.color,
        links: {
          ...baseOptions.particles.links,
          color: themes[currentTheme].particles.links.color,
          opacity: themes[currentTheme].particles.links.opacity
        }
      }
    };
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'sunset') => {
    setCurrentTheme(theme);
  };

  if (!init) {
    return <div>Loading particles...</div>;
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {/* Particles background with current theme */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Particles
          id="theme-particles"
          options={getOptions()}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      {/* Theme selector controls */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1 style={{ color: currentTheme === 'light' ? '#212529' : '#ffffff' }}>
          Theme Switcher Demo
        </h1>
        
        <div style={{ margin: '2rem 0' }}>
          <button
            onClick={() => handleThemeChange('light')}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              background: currentTheme === 'light' ? '#0d6efd' : '#f8f9fa',
              color: currentTheme === 'light' ? '#ffffff' : '#212529',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Light Theme
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              background: currentTheme === 'dark' ? '#6ea8fe' : '#212529',
              color: currentTheme === 'dark' ? '#212529' : '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Dark Theme
          </button>
          
          <button
            onClick={() => handleThemeChange('sunset')}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              background: currentTheme === 'sunset' ? '#feb47b' : '#ff7e5f',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sunset Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
```

### Animated Card Background

```tsx
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

const AnimatedCard = () => {
  return (
    <div className="card" style={{ 
      position: 'relative', 
      width: '350px',
      height: '400px',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      {/* Custom styling for the particles container */}
      <ParticlesBackground 
        containerStyle={{ 
          height: '100%', 
          width: '100%'
        }}
      />
      
      {/* Card content */}
      <div className="card-content" style={{ 
        position: 'relative', 
        zIndex: 10,
        padding: '2rem',
        color: 'white'
      }}>
        <h3>Feature Card</h3>
        <p>This card has an interactive particle background</p>
      </div>
    </div>
  );
};

export default AnimatedCard;
```

### Interactive Form Background

```tsx
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

const LoginForm = () => {
  return (
    <div className="login-container" style={{ 
      position: 'relative', 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Particles with custom configuration */}
      <ParticlesBackground 
        containerClassName="login-background" 
      />
      
      {/* Login form */}
      <div className="login-form" style={{ 
        position: 'relative', 
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '2rem',
        borderRadius: '10px',
        width: '350px'
      }}>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
```

## 📋 Props

The `ParticlesBackground` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | CSS class applied to the Particles component |
| `containerClassName` | `string` | `undefined` | CSS class applied to the container div |
| `containerStyle` | `React.CSSProperties` | `{}` | Custom styles applied to the container div |

## 🛠️ Advanced Usage

### Customizing Particles

You can modify the `ParticlesBackground.tsx` component to customize the particles to your specific needs:

```tsx
// Customize colors
background: {
  color: {
    value: "#your-color", // Change background color
  },
},
particles: {
  color: {
    value: "#your-color", // Change particle color
  },
  // ... other particle options
}
```

### Performance Considerations

The component is already optimized for different screen sizes with responsive configurations:

- Fewer particles on mobile devices (50) compared to desktop (100)
- Slower movement speed on smaller screens
- Reduced frame rates on mobile (30fps vs 60fps on desktop)
- Smaller particle sizes on mobile devices

### Using as a Hero Section Background

```tsx
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

const Hero = () => {
  return (
    <div className="hero-section" style={{ position: 'relative' }}>
      <ParticlesBackground />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 20px' }}>
        <h1>Welcome to My App</h1>
        <p>A beautiful particle animation background</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
```

## ⚙️ API Reference

### ParticlesBackground Component

```tsx
import ParticlesBackground from "./components/ParticlesBackground";

// Basic usage
<ParticlesBackground />

// With custom styling
<ParticlesBackground 
  containerClassName="my-container-class"
  className="my-particles-class"
  containerStyle={{ 
    height: "50vh",
    backgroundColor: "#112233" 
  }} 
/>
```

### Responsive Behavior

The component automatically adapts to different screen sizes:

| Screen Size | Particle Count | Connection Distance | FPS | Particle Size |
|-------------|---------------|---------------------|-----|--------------|
| Mobile (<576px) | 50 | 140px | 30fps | 0.7-4px |
| Tablet (<768px) | 75 | 145px | 60fps | 1-5px |
| Desktop (≥768px) | 100 | 150px | 60fps | 1-5px |

### Internal Structure

The component uses several React hooks for efficient rendering:

- `useState`: Tracks initialization state and window dimensions
- `useEffect`: Handles window resizing and tsParticles initialization
- `useCallback`: Memoizes the particle count calculation function
- `useMemo`: Memoizes the particle configuration options

### Breakpoints

The component defines standard responsive breakpoints:

```tsx
const breakpoints = {
  sm: 576,  // Mobile breakpoint
  md: 768,  // Tablet breakpoint
  lg: 992,  // Laptop breakpoint
  xl: 1200, // Desktop breakpoint
};
```

## 🧰 Development

### Prerequisites

- Node.js 16+
- npm, yarn, or pnpm

### Setup

Clone the repository:

```bash
git clone https://your-repository-url.git
cd your-project-folder
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 📚 Documentation

For more detailed information about tsParticles:

- [tsParticles Documentation](https://particles.js.org/docs/)
- [API Reference](https://particles.js.org/docs/api)

## ⚡ Performance Optimization Tips

The `ParticlesBackground` component is already optimized for performance across devices, but here are additional tips for maximum performance:

### 1. Optimize for Different Devices

```tsx
// Expand the getParticlesCount function to handle more device types
const getParticlesCount = useCallback(() => {
  // Check for low-end devices based on memory and cores
  const isLowEndDevice = 
    navigator.hardwareConcurrency <= 2 || 
    (navigator.deviceMemory && navigator.deviceMemory < 4);
    
  if (isLowEndDevice) return 25;  // Very few particles for low-end devices
  if (windowWidth <= breakpoints.sm) return 40;   // Mobile
  if (windowWidth <= breakpoints.md) return 60;   // Tablet
  if (windowWidth <= breakpoints.lg) return 80;   // Laptop
  return 100;                                     // Desktop
}, [windowWidth]);
```

### 2. Use requestAnimationFrame Throttling

```tsx
// Add this to your component
useEffect(() => {
  let fps = 60;
  if (windowWidth <= breakpoints.sm) fps = 30; // Lower FPS on mobile
  
  // Override the default requestAnimationFrame with throttled version
  const originalRAF = window.requestAnimationFrame;
  let lastTime = 0;
  
  window.requestAnimationFrame = (callback) => {
    return originalRAF((time) => {
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000 / fps) {
        lastTime = currentTime;
        callback(time);
      }
    });
  };
  
  return () => {
    // Restore the original requestAnimationFrame
    window.requestAnimationFrame = originalRAF;
  };
}, [windowWidth]);
```

### 3. Disable Effects Based on Device Capabilities

```tsx
// Dynamically adjust effects based on device
const options: ISourceOptions = useMemo(() => {
  const isMobile = windowWidth <= breakpoints.sm;
  const isTablet = windowWidth <= breakpoints.md && !isMobile;
  
  return {
    // ...other options
    particles: {
      // ...other particle options
      links: {
        enable: !isMobile || (isMobile && devicePerformance === 'high'), // Disable links on low-end mobiles
      },
      // Disable animations on low-end devices
      opacity: {
        value: 0.5,
        animation: {
          enable: !isMobile, // Only enable animations on desktop/tablet
        },
      },
    },
  };
}, [windowWidth, devicePerformance]);
```

## 🗺️ Roadmap

Future development plans for this component:

- [ ] Create a theme provider system for easier customization
- [ ] Add more animation presets for common use cases
- [ ] Implement WebGL renderer option for better performance
- [ ] Add touch gesture interactions for mobile devices
- [ ] Create a configuration builder UI for visual customization
- [ ] Add audio reactivity for music visualization
- [ ] Implement lazy loading option for better page load performance

## 🔧 Customization Examples

### Change Particle Colors

```tsx
// In ParticlesBackground.tsx, modify the options useMemo:
const options: ISourceOptions = useMemo(
  () => ({
    background: {
      color: {
        value: "#000000", // Change to black background
      },
    },
    particles: {
      color: {
        value: "#ff0000", // Change to red particles
      },
      links: {
        color: "#ff0000", // Change to red links
      },
      // ... other options
    },
  }),
  [windowWidth, getParticlesCount]
);
```

### Change Particle Shape

```tsx
// In ParticlesBackground.tsx, modify the shape property:
shape: {
  type: ["circle", "triangle", "square"], // Use multiple shapes
},
```

### Enable Click Interactions

```tsx
// In ParticlesBackground.tsx, modify the onClick property:
onClick: {
  enable: true,       // Enable click interactions
  mode: "push",       // Push particles when clicked
},
```

### Add Particle Movement Animation

```tsx
// In ParticlesBackground.tsx, add animation to particles:
particles: {
  // ... other options
  move: {
    // ... existing move options
    path: {
      enable: true,
      delay: {
        value: 0
      },
      generator: "perlinNoise"
    },
  },
}
```

## 🎬 Animation Presets

Here are some ready-to-use animation configurations that can be applied to your component:

### Slow Floating Particles

```tsx
// Create this in a separate file like presets.ts
export const floatingParticles: ISourceOptions = {
  background: {
    color: {
      value: "#1a1a2e",
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.1,
        sync: false,
      },
    },
  },
  detectRetina: true,
};
```

### Connection Network

```tsx
export const networkParticles: ISourceOptions = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
```

### Fireworks Effect

```tsx
export const fireworksParticles: ISourceOptions = {
  background: {
    color: {
      value: "#000000",
    },
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 0,
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
      animation: {
        enable: true,
        minimumValue: 0,
        speed: 2,
        startValue: "max",
        destroy: "min",
      },
    },
    size: {
      value: { min: 2, max: 4 },
    },
    life: {
      duration: {
        sync: true,
        value: 5,
      },
      count: 1,
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        acceleration: 10,
      },
      speed: { min: 10, max: 20 },
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "destroy",
        top: "none",
      },
    },
  },
  emitters: {
    direction: "top",
    rate: {
      delay: 0.1,
      quantity: 5,
    },
    position: {
      x: 50,
      y: 100,
    },
    size: {
      width: 100,
      height: 0,
    },
    particles: {
      speed: { min: 50, max: 100 },
      move: {
        straight: false,
      },
    },
  },
  detectRetina: true,
};
```

## 🧪 Testing

Run the tests with:

```bash
npm run test
```

## ❓ FAQ

**Q: Why are the particles not showing up?**

A: Check if you have properly initialized the tsParticles engine and imported all required dependencies. Make sure your container has proper width and height set, and check if there are CSS conflicts that might be hiding the particles layer.

**Q: How can I improve performance on low-end devices?**

A: To improve performance:
- Reduce particle count (`number.value`)
- Disable links between particles for very low-end devices
- Lower the FPS limit (`fpsLimit` property)
- Use simpler shapes (stick with "circle" type)
- Reduce particle movement speed

**Q: Can I use different particle shapes?**

A: Yes, you can change the `shape.type` property to use different shapes like "circle", "square", "triangle", or even custom SVG shapes. See the tsParticles documentation for more details.

**Q: How can I make the particles respond to music?**

A: You would need to integrate with the Web Audio API to analyze audio frequencies and then update particle properties based on the audio data. This requires additional customization beyond the basic component.

## 🔧 Troubleshooting

### Common Issues

**Issue: Particles only appear in part of the screen**

Solution: Make sure your container has proper sizing. Add the following CSS to ensure full coverage:

```css
#tsparticles {
  width: 100% !important;
  height: 100vh !important;
  position: absolute;
  top: 0;
  left: 0;
}
```

**Issue: Component prevents interaction with elements underneath**

Solution: Make sure your content has a higher z-index than the particles:

```tsx
<div style={{ position: 'relative', zIndex: 10 }}>
  Your content here
</div>
```

**Issue: Performance issues on mobile**

Solution: The component already implements responsive behavior, but you may need to further reduce particle count or disable certain features:

```tsx
// In ParticlesBackground.tsx
const getParticlesCount = useCallback(() => {
  if (windowWidth <= breakpoints.sm) return 30; // Even fewer particles on mobile
  if (windowWidth <= breakpoints.md) return 50;
  return 80;
}, [windowWidth]);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌐 Browser Compatibility

This component has been tested and confirmed to work well in:

- Google Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Opera (Latest)
- Chrome for Android
- Safari for iOS

Mobile browsers will automatically use the performance-optimized configuration.

## 🎭 Advanced Theming

The `ParticlesBackground` component can be customized to match various themes. Here are some examples:

### Dark Theme

```tsx
// In your component
<ParticlesBackground 
  containerStyle={{ 
    backgroundColor: '#121212' 
  }} 
/>

// Or modify the options in ParticlesBackground.tsx
background: {
  color: {
    value: "#121212", // Dark background
  },
},
particles: {
  color: {
    value: "#ffffff", // White particles for contrast
  },
  links: {
    color: "#ffffff", // White links
    opacity: 0.4,     // Slightly transparent links
  },
}
```

### Colorful Theme Example

```tsx
// Rainbow gradient particles
particles: {
  color: {
    value: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#9900ff"],
  },
  links: {
    color: "#ffffff",
    opacity: 0.3,
  },
}
```

### Seasonal Themes

```tsx
// Winter theme
background: {
  color: {
    value: "#0a2956", // Dark blue background
  },
},
particles: {
  color: {
    value: "#ffffff", // White particles like snow
  },
  shape: {
    type: ["circle", "star"], // Mix of shapes
  },
  size: {
    value: { min: 1, max: 3 }, // Small particles like snowflakes
  },
  move: {
    speed: 2, // Slower movement
    direction: "bottom", // Fall from top to bottom
  },
}
```

## 🔗 Related Projects

- [tsParticles Official](https://github.com/tsparticles/tsparticles) - The core library
- [particles.js](https://github.com/VincentGarreau/particles.js/) - The original particles library
- [React Particles](https://github.com/Wufe/react-particles-js) - Alternative React implementation

## 🔄 Reusability & Best Practices

To make the most of the `ParticlesBackground` component across your projects:

### Creating Preset Configurations

Store your particle configurations in a separate file for easy reuse:

```tsx
// src/components/particlePresets.ts
import { ISourceOptions } from "@tsparticles/engine";

export const networkPreset: ISourceOptions = {
  // Your network style configuration
};

export const floatingPreset: ISourceOptions = {
  // Your floating style configuration 
};

// Then import and use in your component:
// import { networkPreset } from './particlePresets';
// <ParticlesBackground options={networkPreset} />
```

### Component Composition

Create themed particle backgrounds by wrapping the base component:

```tsx
// src/components/DarkParticlesBackground.tsx
import ParticlesBackground from './ParticlesBackground';

export const DarkParticlesBackground = (props) => {
  const darkStyle = {
    backgroundColor: '#121212',
    // Other dark theme styles
  };
  
  return (
    <ParticlesBackground
      containerStyle={{ ...darkStyle, ...props.containerStyle }}
      {...props}
    />
  );
};
```

## 👏 Credits

This component is built using:

- [tsParticles](https://github.com/tsparticles/tsparticles) by Matteo Bruni
- [React](https://reactjs.org/) library
- [TypeScript](https://www.typescriptlang.org/) for type safety

Special thanks to the tsParticles community for creating such a versatile and performant library.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
