# Philippines Interactive Map Viewer

A lightweight, interactive SVG map viewer for the Philippines regions.

## Features
- Interactive region highlighting
- Touch device support
- Responsive design
- Region name labels
- No external dependencies

## Setup
1. Clone the repository
2. Place your SVG file in the `src/assets` directory
3. Run a local server:
```bash
python3 -m http.server 8000
```
4. Visit `http://localhost:8000/src` in your browser

## Project Structure
```
static-svg-viewer/
├── src/
│   ├── assets/
│   │   └── philippines-isometric-green.svg
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── index.html
└── README.md
```