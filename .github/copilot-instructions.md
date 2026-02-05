# Communion Invitation Web App - AI Coding Guidelines

## Project Overview
This is a single-page web application for a communion invitation featuring elegant design with religious themes. The app includes sections for event details, photo gallery, countdown timer, RSVP functionality, and background music.

## Architecture
- **Client-side SPA**: No server-side components, runs entirely in browser
- **Vanilla JavaScript**: No frameworks - pure JS with ES6+ features
- **Modular Components**: Organized into logical sections (hero, gallery, event details, etc.)
- **Asset Organization**: Images in `Assets/imagenes/`, audio in `Assets/audio/`

## Key Components & Patterns

### Carousel Implementation
Use the `ElegantCarousel` class pattern for image galleries:
```javascript
class ElegantCarousel {
    constructor() {
        // Initialize DOM elements
        // Create indicators and thumbnails dynamically
        // Setup event listeners for navigation
    }
}
```
- Dynamic indicator/thumbnail creation from existing slides
- Touch/swipe support with threshold detection
- Keyboard navigation (arrow keys)
- Auto-play with pause on interaction

### Event Handling
- **Smooth Scrolling**: All anchor links use `scrollIntoView({behavior: 'smooth'})`
- **Menu Toggle**: Hamburger menu with CSS transforms for animation
- **RSVP Buttons**: WhatsApp integration with pre-formatted messages
- **External Links**: Calendar (Google Calendar) and Maps integration

### Styling Conventions
- **CSS Variables**: Use defined color palette (`--gold`, `--beige`, `--brown`, etc.)
- **Elegant Theme**: Gold/beige color scheme with subtle gradients and shadows
- **Responsive Design**: Mobile-first with flexible layouts
- **Animations**: CSS transitions for hover states, fade-in animations on scroll

### Countdown Timer
Real-time countdown to event date using `setInterval`:
```javascript
const eventDate = new Date('2026-03-08T14:00:00').getTime();
// Calculate and update DOM elements every second
```

### Music Player
Background audio with play/pause toggle:
- SVG icon changes based on play state
- Error handling for audio loading failures
- User-initiated play (respects browser autoplay policies)

## Development Workflow
- **No Build Process**: Edit files directly, refresh browser to test
- **Local Testing**: Open `index.html` in browser or use local server for assets
- **Live Reload**: Manual refresh or use browser dev tools
- **Asset Updates**: Place images in `Assets/imagenes/`, audio in `Assets/audio/`

## Code Organization
- **HTML**: Semantic sections with IDs for navigation anchors
- **CSS**: Component-based styling with root variables
- **JavaScript**: Feature-organized with classes and DOM manipulation
- **Spanish Content**: All user-facing text in Spanish with religious references

## Common Patterns
- **DOM Ready**: Use `DOMContentLoaded` for initialization
- **Intersection Observer**: For scroll-triggered animations
- **Event Delegation**: Attach listeners to parent elements where appropriate
- **Error Handling**: Graceful degradation (e.g., hide music button if audio fails)

## File Structure Reference
```
index.html          # Main HTML structure
script.js           # All JavaScript functionality
styles.css          # Complete styling
Assets/
  imagenes/         # Event photos and decorative images
  audio/           # Background music file
```

## Testing Checklist
- [ ] Responsive design on mobile/tablet
- [ ] Carousel navigation (buttons, indicators, thumbnails, keyboard, touch)
- [ ] Countdown timer accuracy
- [ ] RSVP WhatsApp links open correctly
- [ ] Calendar integration works
- [ ] Maps links open properly
- [ ] Music player controls
- [ ] Smooth scrolling between sections
- [ ] Menu toggle functionality