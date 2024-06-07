import { $, $$ } from '../../../../store/index.js';
import { arrImgSliderProduct } from '../../../../store/state.js';

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
// Tìm slider phù hợp với productId
const selectedSlider = arrImgSliderProduct.find(slider => slider.id === parseInt(productId));
console.log(selectedSlider);

let { mainImg } = selectedSlider;

// loop img
let mapImgSlider = mainImg.map((imgs, index) => {
    let { img } = imgs;
    let className = index === 0 ? 'fancybox-image active' : 'fancybox-image';
    return `
        <div class="${ className }">
            <img src="${ img }" alt="" class="w-100 h-100" />
        </div>
    `;
}).join('');
// click thumbs phần showDropdow
let mapImgsThumb = mainImg.map((imgs, index) => {
    // phá hủy object để lấy key
    let { img } = imgs;
    let className = index === 0 ? 'fancybox-thumbs__item active position-relative d-inline-block z-index100' : 'fancybox-thumbs__item d-inline-block position-relative z-index100';
    return `
        <a href="" class="${ className }">
            <img src="${ img }" alt="" class="w-100" height="75" />
        </a>
    `;
}).join('');
let div = document.createElement('div');
div.setAttribute('class', 'fancybox fancybox-coating fancybox-coating-click position-fixed top-0 end-0 bottom-0 start-0 bg-rgba00003 z-index106');
div.innerHTML = `
    <div class="fancybox-container fancybox-container-hover position-absolute top-0 end-0 bottom-0 start-0">
        <div class="fancybox-progress-bar z-index102"></div>
        <div class="fancybox-heading z-index100 position-relative">
            <div class="fancybox-heading__content d-flex align-items-center justify-content-between">
                <div class="fancybox-infobar px-10px text-204204204 fs-13px fw-400">
                    <span>0</span>
                    &nbsp;/&nbsp;
                    <span>20</span>
                </div>
                <div class="fancybox-toolbar fancybox-toolbar-click position-relative bg-white cursor-pointer">
                    <div class="toolbar-content d-flex align-items-center justify-content-between">
                        <button class="toolbar-search btn-hover p-10px">
                            <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"></path></svg>
                        </button>
                        <button class="toolbar-Start-slideshow fancybox-button--play btn-hover p-10px">
                            <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"></path></svg>
                            <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"></path></svg>
                        </button>
                        <button class="toolbar-Thumbnails toolbar-Thumbnails-click btn-hover p-10px">
                            <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"></path></svg>
                        </button>
                        <button class="toolbar-Close btn-hover p-10px">
                            <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="fancybox-stage d-flex align-items-center justify-content-between position-absolute">
            <div class="fancybox-btn-group">
                <button class="fancybox-btn fancybox-btn-click-left btn-hover fancybox-btn-left position-absolute p-7px bg-rgba00008 border-0">
                    <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path></svg>
                </button>
                <button class="fancybox-btn fancybox-btn-click-right btn-hover fancybox-btn-right position-absolute p-7px bg-rgba00008 border-0">
                    <svg width="24" height="24" fill="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path></svg>
                </button>
            </div>
            <div class="fancybox-slider-wrap">
                <div class="fancybox-slider d-flex align-items-center position-relative">
                    ${ mapImgSlider }
                </div>
            </div>
            <div></div>
        </div>
        <div class="fancybox-thumbs cursor-pointer">
            <div class="fancybox-thumbs__list p-2">
                ${ mapImgsThumb }
            </div>
        </div>
    </div>
`;
document.body.appendChild(div);
export default $;