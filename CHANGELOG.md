# Changelog

All notable changes to the BUDE Global Tech Presentations project.

## [2.1.0] - 2025-12-30

### ✨ New Features
- **Modular Architecture**: Restructured codebase into 24 modular files
  - 14 JavaScript modules in `src/js/`
  - 10 CSS modules in `src/css/`
- **8 Animation Modes**: Floating shapes, gradient blobs, neon waves, animated grid, particle field, pulse rings, parallax layers, cosmic dust

### ⚡ Performance Improvements
- Added `preconnect` hints for CDN resources
- Added `dns-prefetch` for faster DNS resolution
- Added `defer` attribute to non-critical scripts
- Critical CSS loads before external stylesheets
- Lazy loading for below-fold images
- Adaptive animation quality for mobile devices
- Animations start disabled, load after page render

### 🔒 Security
- Added Content Security Policy (CSP) meta tag
- Added Subresource Integrity (SRI) hashes for CDN resources
- Fixed hardcoded repository paths

### 🐛 Bug Fixes
- Removed circle/sparkle animation on slide change
- Improved mobile responsiveness
- Fixed footer overlap issues

### 📚 Documentation
- Updated README with:
  - Performance optimizations section
  - Modular architecture documentation
  - Updated project structure

---

## [2.0.0] - 2025-12-29

### ✨ Features
- Mobile responsive design
- Compact homepage layout
- Landscape orientation enforcement for presentations
- Dark/Light theme toggle
- GitHub API integration for live stats

### 🔧 Technical
- Animation control panel
- Keyboard shortcuts for animations (1-8)
- Page visibility API for battery saving

---

## [1.0.0] - Initial Release

### Features
- Dynamic presentation loading from JSON
- Smart search with autocomplete
- Reveal.js integration
- Category-based organization
- 40+ presentations
