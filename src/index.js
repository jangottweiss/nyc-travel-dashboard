import ImageMap from './components/Map/ImageMap'

import dummyData from './data/dummy.json'
import geoData from './data/imagesTakenAll.json'



import './styles/app.scss';
import {
    debug
} from 'util';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


/*
 * Keyboard scrolling logic
 *  Scrolling is done via javascript and not via anchors
 *  the reason for that is keyboard navigation and smooth
 *  scrolling animations.
 */
const sections = document.querySelectorAll('section');
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const currentSection = Math.floor(window.scrollY / window.innerHeight);

    if (keyName === 'j') {
        if (currentSection === sections.length - 1) return;
        sections[currentSection + 1].scrollIntoView({
            behavior: "smooth"
        });
    }
    if (keyName === 'k') {
        if (currentSection === 0) return;
        sections[currentSection - 1].scrollIntoView({
            behavior: "smooth"
        });
    }
}, false);

/*
 * Navigation bar scrolling logic
 */
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((ele) => {
    ele.addEventListener('click', (event) => {
        sections[event.srcElement.dataset.index].scrollIntoView({
            behavior: "smooth"
        })
        console.log(event);
    });
})

var last_known_scroll_position = 0;
var ticking = false;

function updateNavBar(scroll_pos) {
    const currentSection = Math.floor(scroll_pos / window.innerHeight);
    window.location.hash = '#' + currentSection;
    // Clear active item
    navItems.forEach(item => item.classList.remove('nav-item-active'));
    // Set active item depending on the current scroll position
    navItems[currentSection].classList.add('nav-item-active');
}

// Scroll Event
window.addEventListener('scroll', function (e) {
    // Throttle scroll event since it is fired very often
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {

            updateNavBar(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;
    }
});



const imageMapSettings = {
    container: 'container1',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.98938, 40.73061],
    zoom: 12,
    scrollZoom: false,
}
const ImageMapAll = new ImageMap(imageMapSettings);
geoData.features = geoData.features.map((e) => {
    e.properties.unix = new Date(e.properties.date).getTime()
    return e;
})
ImageMapAll.createImageMap(geoData);

// const WalkingMap = new Map('container2');
// WalkingMap.createMap(geoData);


console.log("dummyData");
console.log(dummyData);


// const ripple = new MDCRipple(document.querySelector('.mdc-button'));