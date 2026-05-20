# BUDE Global Tech Presentations - Slide Type Reference

## Overview

This document provides comprehensive reference for all supported slide types in the BUDE Global Tech Presentation engine. Each slide type includes JSON schema, visual examples, and usage guidelines.

---

## Standard Slide Types

### 1. Title Slide

Opening slide for presentations.

**Schema:**
```json
{
  "type": "title",
  "title": "Presentation Title",
  "subtitle": "Subtitle or tagline"
}
```

**Use Cases:**
- Presentation opening
- Section introductions with prominent titles

---

### 2. Presenter Slide

Introduces the speaker with credentials and contact information.

**Schema:**
```json
{
  "type": "presenter",
  "name": "Full Name",
  "title": "Job Title",
  "experience": "Years of experience",
  "oss_experience": "Open source contributions",
  "github": "https://github.com/username",
  "website": "https://website.com"
}
```

---

### 3. Topic Title Slide

Section divider slides.

**Schema:**
```json
{
  "type": "topic-title",
  "title": "Section Title",
  "box": {
    "content": "Optional description"
  },
  "note": {
    "text": "Additional context"
  }
}
```

---

### 4. Content Slide

Standard content slide with boxes and lists.

**Schema:**
```json
{
  "type": "content",
  "emoji": "🚀",
  "title": "Slide Title",
  "box": {
    "title": "Box Title",
    "content": "Main content",
    "code": "// Code example",
    "list": [
      { "emoji": "✅", "text": "Feature one" },
      { "emoji": "✅", "text": "Feature two" }
    ]
  },
  "list": [
    { "emoji": "📌", "text": "Top-level point" }
  ],
  "note": {
    "text": "Additional notes or tips"
  }
}
```

---

## Advanced Slide Types

### 5. Comparison Slide

Two-column side-by-side comparison.

**Schema:**
```json
{
  "type": "comparison",
  "title": "Comparison Title",
  "leftTitle": "Option A",
  "leftPoints": [
    "Feature one",
    "Feature two",
    "Feature three"
  ],
  "rightTitle": "Option B",
  "rightPoints": [
    "Different feature one",
    "Different feature two",
    "Different feature three"
  ]
}
```

**Use Cases:**
- Technology comparisons (React vs Vue)
- Before/After scenarios
- Pros and Cons analysis
- Feature matrix comparisons

**Visual Layout:**
```
┌─────────────────────┬─────────────────────┐
│   Left Column       │   Right Column      │
│   - Point 1         │   - Point 1         │
│   - Point 2         │   - Point 2         │
│   - Point 3         │   - Point 3         │
└─────────────────────┴─────────────────────┘
```

**Responsive Behavior:**
- Desktop: Side-by-side columns
- Mobile: Stacked vertically

---

### 6. Image/Text Layout Slide

Alternating image and text layouts.

**Schema:**
```json
{
  "type": "imageText",
  "title": "Slide Title",
  "layout": "left-image",  // or "right-image"
  "image": "path/to/image.jpg",
  "imageAlt": "Image description",
  "caption": "Image caption",
  "content": "<p>Text content with HTML support</p>"
}
```

**Layout Options:**

**Left Image:**
```
┌──────────┬────────────────────┐
│  Image   │  Text Content      │
│          │  - Details         │
│          │  - Information     │
└──────────┴────────────────────┘
```

**Right Image:**
```
┌────────────────────┬──────────┐
│  Text Content      │  Image   │
│  - Details         │          │
│  - Information     │          │
└────────────────────┴──────────┘
```

**Use Cases:**
- Product showcases
- Architecture diagrams with explanations
- Process flows with descriptions
- Screenshot walkthroughs

**Image Guidelines:**
- Recommended size: 800x600px minimum
- Max height: 400px (auto-scaled)
- Supported formats: JPG, PNG, SVG, WebP
- Use descriptive alt text for accessibility

---

### 7. Interactive Quiz Slide

Multiple-choice quiz with answer validation and explanations.

**Schema:**
```json
{
  "type": "quiz",
  "question": "What is the correct answer?",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctAnswer": 2,
  "explanation": "Detailed explanation of why the answer is correct"
}
```

**Behavior:**
1. User clicks an option
2. System validates selection
3. Correct answer highlights in green
4. Incorrect selections highlight in red
5. Explanation appears below options

**Use Cases:**
- Knowledge checks during training
- Certification preparation
- Engagement in long presentations
- Learning reinforcement

**Answer Index:**
- `correctAnswer: 0` = First option (A)
- `correctAnswer: 1` = Second option (B)
- `correctAnswer: 2` = Third option (C)
- And so on...

---

### 8. Video Embed Slide

Embedded video with multiple source support.

**Schema:**
```json
{
  "type": "video",
  "title": "Video Title",
  "videoUrl": "https://youtube.com/watch?v=VIDEO_ID",
  "caption": "Video description or context"
}
```

**Supported Video Sources:**

**YouTube:**
```json
"videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

**Vimeo:**
```json
"videoUrl": "https://vimeo.com/123456789"
```

**Direct MP4/WebM:**
```json
"videoUrl": "https://example.com/video.mp4"
```

**Features:**
- 16:9 responsive aspect ratio
- Native browser controls for MP4
- Embedded player for YouTube/Vimeo
- Auto-pause on slide exit (Reveal.js default)

**Use Cases:**
- Demo videos
- Tutorial walkthroughs
- Conference talk recordings
- Product showcases

---

### 9. Chart Slide

Data visualization with bar, line, and pie charts.

**Schema:**
```json
{
  "type": "chart",
  "title": "Chart Title",
  "chartType": "bar",  // "bar", "line", or "pie"
  "labels": ["Label 1", "Label 2", "Label 3"],
  "data": [45, 78, 62]
}
```

**Chart Types:**

**Bar Chart:**
```json
{
  "chartType": "bar",
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "data": [150, 230, 180, 290]
}
```
- Best for: Comparing categories
- Visual: Vertical bars
- Displays values on bars

**Line Chart:**
```json
{
  "chartType": "line",
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "data": [10, 25, 18, 35]
}
```
- Best for: Trends over time
- Visual: Connected points
- Shows progression

**Pie Chart:**
```json
{
  "chartType": "pie",
  "labels": ["Product A", "Product B", "Product C"],
  "data": [40, 35, 25]
}
```
- Best for: Part-to-whole relationships
- Visual: Circular segments
- Shows percentages of total

**Color Palette:**
Charts use the BUDE brand color palette:
- #0060a0 (Primary Blue)
- #6f42c1 (Purple)
- #cb6ce6 (Pink)
- #23a6d5 (Light Blue)
- #23d5ab (Teal)

---

### 10. Diagram Slide

ASCII/text-based diagrams and flowcharts.

**Schema:**
```json
{
  "type": "diagram",
  "title": "System Architecture",
  "content": "    ┌─────────┐\n    │ Client  │\n    └────┬────┘\n         │\n    ┌────▼────┐\n    │ Server  │\n    └─────────┘"
}
```

**Use Cases:**
- Architecture diagrams
- Flowcharts
- Sequence diagrams
- Network topologies
- Data flow diagrams

**Tools for Creating Diagrams:**
- Asciiflow (asciiflow.com)
- Monodraw (macOS)
- PlantUML text format
- Mermaid markdown syntax

**Example Patterns:**

**Simple Flow:**
```
Client → API → Database → Response
```

**Architecture:**
```
┌──────────┐     ┌──────────┐
│ Frontend │────▶│ Backend  │
└──────────┘     └────┬─────┘
                      │
                 ┌────▼─────┐
                 │ Database │
                 └──────────┘
```

---

## Closing Slides

### 11. Q&A Slide

Question and answer segment slide.

**Schema:**
```json
{
  "type": "qa",
  "title": "Questions?",
  "content": "Let's discuss any questions you might have"
}
```

---

### 12. Thank You Slide

Closing slide with contact information.

**Schema:**
```json
{
  "type": "thank-you",
  "title": "Thank You!",
  "box": {
    "content": "Closing message",
    "note": "Additional context"
  },
  "footer": {
    "org": "Organization Name",
    "tagline": "Your tagline"
  }
}
```

---

## Layout Utilities

### Grid Layouts

You can use grid utilities in custom HTML content:

**Two-Column Grid:**
```html
<div class="grid-2col">
  <div>Column 1 content</div>
  <div>Column 2 content</div>
</div>
```

**Three-Column Grid:**
```html
<div class="grid-3col">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Responsive Behavior:**
- Desktop: Multi-column layout
- Mobile: Single column stack

---

## Best Practices

### Slide Design

1. **One idea per slide** - Keep slides focused
2. **Use consistent emoji** - Maintain visual language
3. **Limit text** - 5-7 bullets maximum per slide
4. **High contrast** - Ensure readability
5. **Test on mobile** - Verify responsive behavior

### Content Guidelines

1. **Clear titles** - Descriptive and concise
2. **Action-oriented** - Use verbs in bullet points
3. **Code snippets** - Keep under 15 lines
4. **Image quality** - Use high-resolution images
5. **Video length** - Keep embedded videos under 5 minutes

### Accessibility

1. **Alt text** - Provide for all images
2. **Color contrast** - WCAG AA compliance
3. **Font sizes** - Readable on all devices
4. **Quiz explanations** - Clear and comprehensive
5. **Video captions** - Include when possible

### Performance

1. **Image optimization** - Compress before upload
2. **Video hosting** - Use YouTube/Vimeo for large files
3. **Chart complexity** - Limit data points (max 10-15)
4. **Slide count** - Keep presentations under 60 slides
5. **Animation timing** - Balance visual appeal with load time

---

## Migration Guide

### Upgrading Existing Presentations

The enhanced engine maintains full backward compatibility. Existing presentations require no changes. To use new features:

1. **Add new slide types** - Insert into topics array
2. **Test locally** - Verify in browser
3. **Check mobile** - Ensure responsive behavior
4. **Validate JSON** - Use online validators
5. **Commit changes** - Push to repository

### Common Migration Patterns

**Converting comparison content:**
```json
// Before (two content slides)
{ "type": "content", "title": "Option A", "list": [...] }
{ "type": "content", "title": "Option B", "list": [...] }

// After (one comparison slide)
{
  "type": "comparison",
  "leftTitle": "Option A",
  "leftPoints": [...],
  "rightTitle": "Option B",
  "rightPoints": [...]
}
```

---

## Troubleshooting

### Common Issues

**Chart not rendering:**
- Verify `data` array contains numbers
- Check `labels` length matches `data` length
- Ensure chartType is "bar", "line", or "pie"

**Video not playing:**
- Confirm URL is publicly accessible
- Check video embedding permissions
- Verify correct URL format for platform

**Quiz not responding:**
- Ensure `correctAnswer` is valid index (0-based)
- Check options array is not empty
- Verify JavaScript is enabled

**Image not displaying:**
- Confirm image path is correct
- Check image file exists in assets
- Verify image format is supported

**Layout breaking on mobile:**
- Test with browser dev tools
- Check for fixed-width content
- Ensure responsive classes are applied

---

## Support

For issues, questions, or feature requests:

- **GitHub Issues**: [Report a bug](https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations/issues)
- **Discussions**: [Ask questions](https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations/discussions)
- **Documentation**: Check README.md for setup instructions

---

## Version History

**v2.0.0** - Enhanced Engine
- Added comparison slides
- Added image/text layouts
- Added interactive quizzes
- Added video embeds
- Added chart components
- Added diagram support
- Improved animations
- Enhanced responsive design

**v1.0.0** - Initial Release
- Basic slide types
- Category system
- Search functionality
- Responsive design

---

**Last Updated**: November 2025  
**Engine Version**: 2.0.0  
**Maintainer**: Bude Global Enterprise