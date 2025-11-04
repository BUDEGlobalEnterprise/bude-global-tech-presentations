# Dynamic Presentation Loader

A modern, dynamic presentation system that automatically discovers and validates JSON presentation files with real-time search and keyboard navigation.

## Features

- 🚀 **Auto-Discovery**: Automatically scans and loads available presentation files
- ✅ **Format Validation**: Validates JSON structure before displaying presentations
- 🔍 **Real-time Search**: Search by title, description, or keywords with autocomplete
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- ⌨️ **Keyboard Support**: Full keyboard navigation during presentations
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## Quick Start

1. **Clone or download** this repository
2. **Add your presentations** to the `PRESENTATIONS_CONFIG` array in `script.js`:
```javascript
{
    file: 'your-presentation.json',
    title: 'Your Presentation Title',
    description: 'Brief description of your presentation',
    keywords: ['topic', 'keywords', 'here']
}