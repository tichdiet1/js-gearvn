import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrPageslist = pageMain.arrPageslist;

const mapPageslist = arrPageslist.map(item => {
    let { title, detail, listImg } = item;
    const arrImgObject = listImg.map(img => {
        const checkFigcaption = img.figcaption !== '' ? img.figcaption : '';
        return  `
            <figure class="pagesList-image flex-1 mb-0 px-2">
                <img alt="${ img.alt }" class="w-100 h-100 card-img-top card-img-bottom"
                lazy-src="${ img.mainImg }"/>
                <figcaption class="fs-15px mt-2 hover-figcaptionPageList cursor-pointer">${ checkFigcaption }</figcaption>
            </figure>
        `
    }).join('');
    return `
    <div class="pagesList-main position-relative">
        <div class="pagesList-top">
            <div class="pagesList-top--content d-flex align-items-center justify-content-between px-4 py-12px">
                <div class="htitle">
                    <h3 class="fs-4 fw-500 mb-0">${ title }</h3>
                </div>
                <div class="htitle">
                    <p class="mb-0">
                        <a href="" class="text-decoration-none hover-detail text-1982F9 fw-500">${ detail }</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="pagesList-bottom">
            <div class="pagesList-bottom-content d-flex align-items-center justify-content-between px-4">
                ${ arrImgObject }
            </div>
        </div>
    </div>
    `;
}).join('');
let stringPageslist = `
    <div class="container">
        <div class="pagesList-group bg-white shadow-lg rounded-1 mb-3">
            ${ mapPageslist }
        </div>
    </div>
`;
let section = document.createElement('section');
section.setAttribute('class', 'section-pagesList pb-1');
section.innerHTML = stringPageslist;
let main = $('main');
main.insertBefore(section, main.children[13]);
export default arrPageslist;