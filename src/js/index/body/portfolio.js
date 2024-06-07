import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrPortfolio = pageMain.arrPortfolio;
const mapPortfolio = arrPortfolio.map(item => {
    let { name, mainImg } = item;
    return `
        <a href="#" class="link-portfolio text-center justify-content-center text-decoration-none text-center text-dark">
            <img alt="Laptop" title="Laptop" class="d-block mx-auto"
            lazy-src="${ mainImg }" />
            <span>${ name }</span>
        </a>
    `;
}).join('');
let resultPortfolio = `
        <div class="container py-3">
            <div class="wrapper-portfolio bg-white rounded-2">
                <div class="hedding-portfolio border-bottom border-1 border-secondary px-3 py-3">
                    <div class="box-portfolio">
                        <h2>
                            <a href="#" class="hoverTitle-portfolio text-decoration-none text-dark">Danh mục sản
                                phẩm</a>
                        </h2>
                    </div>
                </div>
                <div class="bottom-portfolio">
                    <div class="boxBottom-portfolio d-flex flex-wrap py-3">
                        ${ mapPortfolio }
                    </div>
                </div>
            </div>
        </div>
`;
let section = document.createElement('section');
section.setAttribute('class', 'section-portfolio');
section.innerHTML = resultPortfolio;
let main = $('main');
main.insertBefore(section, main.children[15]);
export default pageMain;