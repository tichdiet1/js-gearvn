import { $, $$, $$$ } from "../../store/index.js";

import { disableScroll, enableScroll } from '../disableScrollDropdown/index.js';
var wrapper = document.querySelector('#wrapper');
var isScrolling = false;

document.addEventListener('scroll', function() {
    if (!isScrolling) {
        isScrolling = true;
        
        // Get the scroll position relative to the top of the document
        var scrollPosition = window.scrollY;

        // Get the height of the wrapper element
        var wrapperHeight = wrapper.offsetHeight;

        // Get the height of the viewport
        var viewportHeight = window.innerHeight;

        if (scrollPosition <= 0 && wrapperHeight > viewportHeight) {
            window.scrollTo(0, 1);
        }

        setTimeout(function() {
            isScrolling = false;
        }, 100);
    }
});
export default $;