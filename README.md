# Bao Hoang — Portfolio

A responsive, multi-page engineering portfolio built with plain HTML, CSS, and JavaScript.

The site presents Bao Hoang's work across NASA CERES scientific software, full-stack development, machine learning, system design, and technical operations.

## Site structure

- `index.html` — engineering overview, selected results, and featured work
- `career.html` — detailed professional experience and technical capabilities
- `projects.html` — filterable project portfolio and case studies
- `education.html` — computer science education and independent learning roadmap
- `background.html` — personal background and engineering principles
- `hobbies.html` — interests and activities outside professional work
- `style.css` — responsive visual system with light and dark themes
- `script.js` — navigation, theme persistence, project filtering, and motion behavior

## Design goals

- Content-first presentation without template-like glassmorphism or oversized pill controls
- Clear visual hierarchy and restrained interaction design
- Responsive navigation for desktop and mobile
- Keyboard-visible focus states and semantic HTML structure
- Reduced-motion support
- No framework or build step

## Local development

Serve the repository with any static file server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
