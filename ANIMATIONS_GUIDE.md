# Animation System Guide

## Overview
This portfolio features a sophisticated animation system built with GSAP (GreenSock Animation Platform) and Three.js for 3D effects.

## Components

### 1. BrickHero3D (`components/brick-hero-3d.tsx`)
**3D Brick-Forming Hero Animation**
- Renders an interactive 3D scene with procedurally-generated bricks
- Bricks animate into formation with a staggered falling effect
- Features:
  - 20 bricks arranged in a 5x4 grid
  - Individual rotation and scale animations
  - Mouse hover detection with color and depth changes
  - Smooth camera movement
  - Dynamic lighting (ambient + directional + point lights)
  - Real-time raycasting for interaction
  
**Configuration:**
- Change brick count: Adjust `rows` and `cols` variables
- Adjust animation timing: Modify `delay: (row * cols + col) * 0.05` multiplier
- Customize colors: Update color hex values in material creation

### 2. PageTransition (`components/page-transition.tsx`)
**Page Load Animations**
- Automatically animates all content when page loads
- Staggered animations for:
  - Main content (fade in + slide up)
  - All headings (h1, h2)
  - Paragraphs
  - Buttons and button-like links
  - Cards and bordered containers
  
**Triggers:**
- Runs on every pathname change using `usePathname()`
- All animations are staggered for smooth, sequential reveal

### 3. ScrollAnimations (`components/scroll-animations.tsx`)
**Scroll-Based Effects**
- Parallax scrolling on hero sections
- Fade-in animations as sections come into view
- Staggered card animations
- Uses GSAP ScrollTrigger plugin for performance
- Scrub animations sync with scroll progress

**Features:**
- Sections animate in from below as user scrolls
- Hero sections have parallax effect (move slower than scroll)
- Cards slide in from left with stagger

### 4. InteractiveAnimations (`components/interactive-animations.tsx`)
**Interactive Element Animations**
- Button hover: Scale up (1 → 1.05)
- Links: Color change on hover
- Cards: Lift up with shadow on hover
- Form inputs: Border color and glow on focus
- All animations are smooth with easing functions

## Animation Timing

| Animation | Duration | Delay | Ease Function |
|-----------|----------|-------|----------------|
| Page load main | 0.6s | 0s | power2.out |
| Heading animation | 0.8s | 0.2s | power3.out |
| Paragraph animation | 0.7s | 0.3s | power2.out |
| Button animation | 0.6s | 0.4s | back.out |
| Card animation | 0.8s | 0.2s | power3.out |
| Scroll reveal | 1s | varies | power3.out |
| Hover scale | 0.3s | 0s | power2.out |

## Customization

### Modify Page Transitions
Edit `components/page-transition.tsx`:
```typescript
// Change duration
duration: 0.6, // Adjust this value

// Change delay
delay: 0.2, // Stagger starting point

// Change easing
ease: 'power2.out', // Try 'back.out', 'elastic.out', etc.
```

### Customize 3D Brick Animation
Edit `components/brick-hero-3d.tsx`:
```typescript
// Brick dimensions
const brickWidth = 2
const brickHeight = 1
const brickDepth = 0.5

// Grid size
const rows = 4
const cols = 5

// Material color
color: '#1a1a2e' // Change brick base color

// Animation timing
duration: 1.2, // Fall animation duration
delay: delay, // Stagger amount
```

### Add New Animations
1. Create a new component in `components/`
2. Use GSAP for animations
3. Import and add to `app/layout.tsx`
4. Component should return `null` (just handles animations)

## GSAP Easing Functions

Common easing options:
- `power1.out`, `power2.out`, `power3.out` - Smooth deceleration
- `back.out` - Bounce back effect
- `elastic.out` - Spring effect
- `bounce.out` - Bouncy landing
- `sine.out` - Smooth sine curve
- `circ.out` - Circular easing
- `expo.out` - Exponential ease

## Performance Considerations

1. **3D Rendering**: Uses WebGL with requestAnimationFrame for 60fps
2. **Scroll Triggers**: ScrollTrigger plugin optimizes scroll performance
3. **GPU Acceleration**: CSS transforms and 3D context enable hardware acceleration
4. **Cleanup**: All event listeners are properly removed on component unmount

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (15+)
- Mobile: Touch-optimized, 3D rendering supported

## Troubleshooting

### 3D Brick Animation Not Showing
- Check console for WebGL errors
- Ensure Three.js is properly installed: `npm install three`
- Verify containerRef is properly mounted

### Scroll Animations Janky
- Clear browser cache
- Disable hardware acceleration if needed
- Reduce animation complexity on mobile

### Page Transitions Not Working
- Ensure PageTransition component is in layout
- Check that routing is working (usePathname)
- Verify elements have correct selectors in gsap.to()

## Future Enhancements

- [ ] Add lenis smooth scrolling
- [ ] Create timeline animations for sequences
- [ ] Add morph shape animations
- [ ] Implement canvas text effects
- [ ] Add sound effects synchronized with animations
