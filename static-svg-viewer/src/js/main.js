// Constants
const HOVER_COLOR = '#4CAF50';

// Import province descriptions
import { provinceDescriptions } from './data/provinceData.js';

// Main initialization
document.addEventListener('DOMContentLoaded', initializeMap);

document.addEventListener('DOMContentLoaded', () => {
    // Menu button click handler
    const menuBtn = document.querySelector('.menu-btn');
    const menuDropdown = document.querySelector('.menu-dropdown');
    
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', () => {
        menuDropdown.style.display = 'none';
    });
    
    // Login button click handler
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        console.log('Login clicked');
        // Add your login logic here
    });

    setupZoomGestures();
});

function initializeMap() {
    const svgObject = document.getElementById('svg-object');
    const label = document.getElementById('region-label');

    svgObject.addEventListener('load', () => setupSVGInteractions(svgObject, label));
}

function setupSVGInteractions(svgObject, label) {
    const svgDoc = svgObject.contentDocument;
    const paths = svgDoc.querySelectorAll('path');

    // Add marker for Cebu
    addProvinceMarker(svgDoc);

    paths.forEach(path => setupPathInteractions(path, label));
}

function setupPathInteractions(path, label) {
    const regionName = path.getAttribute('id') || path.getAttribute('class');
    
    // Touch events
    path.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleTouchStart(e, path, label, regionName);
    }, { passive: false });

    path.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleTouchEnd(path, label);
    }, { passive: false });

    // Mouse events
    path.addEventListener('mouseover', (e) => handleMouseOver(e, path, label, regionName));
    path.addEventListener('mouseout', () => handleMouseOut(path, label));
    path.addEventListener('click', () => handleClick(regionName));
}

function handleMouseOver(event, path, label, regionName) {
    path.style.fill = HOVER_COLOR;
    updateLabel(label, regionName);

    // Update tour panel when region is clicked
    const selectedRegions = document.getElementById('selected-regions');
    path.addEventListener('click', () => {
        const regionEntry = document.createElement('div');
        regionEntry.textContent = regionName.replace(/_/g, ' ');
        selectedRegions.appendChild(regionEntry);
    });
}

function handleMouseOut(path, label) {
    path.style.fill = path.dataset.originalColor;
    path.style.transform = 'translateZ(0)';
    hideLabel(label);
}

function handleClick(regionName) {
    console.log(`Clicked region: ${regionName}`);
    // Store clicked state if needed, but don't change the color permanently
}

function handleTouchStart(event, path, label, regionName) {
    path.style.fill = HOVER_COLOR;
    const touch = event.touches[0];
    const description = provinceDescriptions[regionName] || 'Region of the Philippines';
    
    updateLabel(label, regionName, description);
    label.classList.add('visible');
}

function handleTouchEnd(path, label) {
    path.style.fill = path.dataset.originalColor || '';
    label.classList.remove('visible');
}

function updateLabel(label, regionName) {
    const description = provinceDescriptions[regionName] || 'Region of the Philippines';
    label.innerHTML = `
        <strong>${regionName.replace(/_/g, ' ')}</strong>
        <div class="description">${description}</div>
    `;
    label.classList.add('visible');
}

function hideLabel(label) {
    label.classList.remove('visible');
}

function addProvinceMarker(svgDoc) {
    const cebuPath = svgDoc.querySelector('#Cebu');
    if (!cebuPath) return;

    // Get Cebu province position
    const bbox = cebuPath.getBBox();
    const markerX = bbox.x + (bbox.width / 2);
    const markerY = bbox.y + (bbox.height / 2);

    // Create marker element
    const marker = document.createElement('div');
    marker.className = 'province-marker';
    
    // Position marker
    marker.style.left = `${markerX}px`;
    marker.style.top = `${markerY}px`;
    
    // Add marker to SVG container
    document.querySelector('.svg-wrapper').appendChild(marker);
}

// Add pinch-zoom support
function setupZoomGestures() {
    const container = document.getElementById('svg-container');
    let initialDistance = 0;
    let currentScale = 1;

    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = getTouchDistance(e.touches);
        }
    });

    container.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            const currentDistance = getTouchDistance(e.touches);
            const scale = currentDistance / initialDistance;
            currentScale = Math.min(Math.max(scale, 0.5), 2);
            
            document.querySelector('.svg-wrapper').style.transform = 
                `scale(${currentScale})`;
        }
    });
}

function getTouchDistance(touches) {
    return Math.hypot(
        touches[0].pageX - touches[1].pageX,
        touches[0].pageY - touches[1].pageY
    );
}