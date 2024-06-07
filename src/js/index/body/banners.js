import { pageMain, $, $$, $$$ } from '../../../store/index.js';
let stringPortfolio = `
    <div class="container">
        <div class="banners-group d-flex align-items-center mt-1 mb-4 cursor-pointer">
            <div class="row">
                <div class="col-8">
                    <img alt="" class="w-100 card-img-top card-img-bottom"
                    lazy-src="/DAJS/src/assets/images/hinh-1-banners.webp"/>
                </div>
                <div class="col-4">
                    <div class="d-flex flex-column h-100 justify-content-between">
                        <div class="banners-top">
                            <img alt="" class="w-100 card-img-top card-img-bottom" 
                            lazy-src="/DAJS/src/assets/images/hinh-2-banners.webp"/>
                        </div>
                        <div class="banners-bottom">
                            <img alt="" class="w-100 card-img-top card-img-bottom"
                            lazy-src="/DAJS/src/assets/images/hinh-3-banners.webp"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
let section = document.createElement('section');
section.setAttribute('class', 'section-banners');
section.innerHTML = stringPortfolio;
let main = $('main');
main.insertBefore(section, main.children[10]);
export default stringPortfolio;