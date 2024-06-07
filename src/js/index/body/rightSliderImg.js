import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrImg = pageMain.image;
const arrMapImg = arrImg.map(item => {
    let sliderRightContent = '';
    sliderRightContent += `
        <div class="slider-right__content flex-grow-1 cursor-pointer" title="${ item.titleAttribute }">
            <img src="${ item.image }" class="w-100 h-100" alt="Project zero white" title="Project zero white">
        </div>
    `;
    return sliderRightContent;
})
arrMapImg.forEach(item => {
    $('.slider-right').innerHTML += item;
})
export default arrImg;