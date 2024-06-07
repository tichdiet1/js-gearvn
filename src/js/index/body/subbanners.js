import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrSubbannersImg = pageMain.arrSubbannersImg;
const arrMapSubbannersImg = arrSubbannersImg.map(item => {
    return `
        <div class="col-lg-3 px-0">
            <picture>
                <img src="${ item.image }" alt="" class="w-100 h-100 cursor-pointer" title="${ item.titleAttribute }">
            </picture>
        </div>
    `;
}).join('');
let resultString = `
    <div class="container">
        <div class="row subbanners-row pb-4">
            ${ arrMapSubbannersImg }
        </div>
    </div>
`;
let section = document.createElement('section');
section.setAttribute('class', 'section-subbanners');
section.innerHTML = resultString;
document.body.querySelector('main').insertBefore(section, document.body.querySelector('main').children[1]);
export default arrSubbannersImg;