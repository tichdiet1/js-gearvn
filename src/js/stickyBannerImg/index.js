import { pageMain, $, $$$ } from "../../store/index.js";
const arrStickyBannerImg = pageMain.arrStickyBannerImg;
const mapBannerImg = arrStickyBannerImg.map(item => {
    let { mainImg, alt } = item;
    const checkAlt = alt === 'PC Gaming' ? 'btn-advertisement position-absolute translate-middle-y' : 'btn-advertisement position-absolute translate-middle-y';
    return `
        <div class="${ checkAlt }">
            <img src="${ mainImg }" alt="${ alt }" class="w-100 h-100 card-img-top card-img-bottom">
        </div>
    `;
}).join('');
let section = document.createElement('section');
section.setAttribute('class', 'sticky-advertisement translate-middle-y start-0 end-0 position-fixed');
section.innerHTML = mapBannerImg;
const body = document.body;
body.appendChild(section);

// xử lý scroll khi cuộn xuống thì hai tấm ảnh cũng được thêm sticky và kéo lên = 0 thì xóa sticky
let offsetTop = $('.header-top').offsetTop;
document.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop >= offsetTop) {
        $('.sticky-advertisement').classList.add('active');
    } else {
        $('.sticky-advertisement').classList.remove('active');
    }
});

export default arrStickyBannerImg