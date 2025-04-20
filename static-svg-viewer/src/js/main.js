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

    // Add data attribute for original color
    const originalColor = path.style.fill || '';
    path.dataset.originalColor = originalColor;

    // Mouse events
    path.addEventListener('mouseover', (e) => handleMouseOver(e, path, label, regionName));
    path.addEventListener('mouseout', () => handleMouseOut(path, label));
    path.addEventListener('click', () => handleClick(regionName));

    // Touch events
    path.addEventListener('touchstart', (e) => handleTouchStart(e, path, label, regionName));
    path.addEventListener('touchend', () => handleTouchEnd(label));
}

function handleMouseOver(event, path, label, regionName) {
    path.style.fill = HOVER_COLOR;
    // Add depth effect on hover
    path.style.transform = `translateZ(${10}px)`;
    path.style.transition = 'transform 0.2s ease';
    updateLabel(label, regionName, event.pageX, event.pageY);
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
    event.preventDefault();
    const touch = event.touches[0];
    updateLabel(label, regionName, touch.pageX, touch.pageY);
}

function handleTouchEnd(label) {
    hideLabel(label);
}

function updateLabel(label, text, x, y) {
    const description = provinceDescriptions[text] || text;
    label.innerHTML = `
        <strong>${text.replace(/_/g, ' ')}</strong>
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