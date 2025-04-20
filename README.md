# Philippines Interactive Map Viewer

An interactive, isometric SVG map viewer for exploring Philippines regions with region descriptions and tour planning features.

## Features
- 🗺️ Interactive isometric map of the Philippines with 3D effects
- 🔍 Detailed region descriptions and information
- 📱 Responsive design for desktop, tablet, and mobile
- 🖱️ Mouse and touch device support
- 🎯 Region highlighting and selection
- 🎨 Smooth animations and transitions
- 📋 Tour planning functionality
- 🌐 No external dependencies

## Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd static-svg-viewer
```

2. Install dependencies (none required)

3. Run local server:
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
│   │   ├── main.js
│   │   └── data/
│   │       └── provinceData.js
│   └── index.html
└── README.md
```

## Usage
- Hover over regions to see details
- Click regions to add them to your tour plan
- Use mouse wheel or pinch gestures to zoom
- Touch-enabled for mobile devices
- Responsive layout adapts to screen size

## Browser Support
- webkit browser like Chrome (recommended)
- Mobile browsers with touch support

## Development
The project uses vanilla JavaScript and CSS with no build process required:
- CSS: Custom properties for theming
- JS: ES6 modules for organization
- SVG: Vector map with interactive paths

In the future, we plan to add more features and improve user experience. Most likely we will use a build process with Webpack or similar tools to bundle and minify assets. We may also consider using a framework like React or Vue.js for better state management and componentization.

