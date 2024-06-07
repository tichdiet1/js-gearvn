import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrCategory = pageMain.arrCategory;

const mapCategory = arrCategory.map((item) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'slidebar-menu');
    let sliderBarList = '';
    let row = '';
    for(let key in item) {
        // trả về true false cùng lúc, hasOwnProperty kiểm tra key có bằng 'listMenutext', nếu bằng thì trả về true và thuộc tính còn lại thì trả về false đồng bộ
        if (key === 'listMenutext' && item.hasOwnProperty(key)) {
            const listMenutext = item[key]; // lấy được nguyên 1 object listMenutext
                sliderBarList += `
                <a href="#" class="sliderBar-list text-decoration-none text-dark cursor-pointer px-3 py-1 d-flex align-items-center justify-content-between position-relative z-index103">
                    <div class="menu__Icon">
                        ${ listMenutext.iconName }
                        <span class="menu__Icon-text">${ listMenutext.name }</span>
                    </div>
                    ${ listMenutext.iconRight }
                </a>
            `;
        }
        if (key === 'showCategoryList' && item.hasOwnProperty(key)) {
            const objectRow = item[key];
            objectRow.map(obj => {
                let detai = '';
                detai += obj.detai.map(detaiLoop => {
                    let li = ''; // Thêm biến li
                    li += detaiLoop.liList.map(liItem => {
                        return `
                            <li class="list-group">
                                <a href="#" class="text-decoration-none hover-dropdownLinkList fs-13px text-dark mb-2">${liItem.li}</a>
                            </li>
                        `;
                    }).join('');
                    return `
                        <div class="detai-listNavbar">
                            <div class="dropdown-listHedding">
                                <h3 class="mb-0 fs-14px fw-600 text-danger pb-2 pt-3">${ detaiLoop.name }</h3>
                                <ul class="mb-0 ps-0">
                                    ${ li }
                                </ul>
                            </div>
                        </div>
                    `;
                }).join('');
                row += `
                    <div class="row row-cols-lg-5 w-100">
                        ${ detai }
                    </div>
                `;
            })
        }
    }
    let sliderBarAndDropdown = '';
    sliderBarAndDropdown += `
        ${ sliderBarList }
        <div class="dropdown-listContainer z-index104 overflow-x-hidden overflow-y-auto position-absolute top-0 h-100 ms-20px bg-white">
            <div class="listContainer-container py-10px px-3">
                ${ row }
            </div>
        </div>
    `;
    div.innerHTML = sliderBarAndDropdown;
    return div.outerHTML;
}).join('');

// $('.detal-listRelated').innerHTML += mapCategory;
let stringSidebar = `
        <div class="container">
            <div class="row">
                <div class="col-lg-2-17 px-0">
                    <div class="slidebar-Group slidebar-groupMenu position-relative bg-white shadow-lg">
                        <div class="detal-listRelated py-21px">
                            ${ mapCategory }
                        </div>
                    </div>
                </div>
                <div class="col-lg-10-82">
                    <div class="row">
                        <div class="col-8 px-2">
                            <div class="carousel-group d-flex flex-column justify-content-between h-100 user-select-none">
                                
                            </div>
                        </div>
                        <div class="col-4">
                            <picture class="slider-right d-flex flex-column h-100">
                                
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
let section = document.createElement('section');
section.setAttribute('class', 'slidebar py-3 position-relative');
section.innerHTML = stringSidebar;
let main = $('main');
main.insertBefore(section, main.children[0])
// hover lên từng thẻ li thì hiện lên màu đỏ
$$('.slidebar-menu').forEach((items, index) => {
    items.onmouseenter = function() {
        $$('.slidebar-menu').forEach(items => {
            items.classList.remove('active');
        })
        $$('.slidebar-menu')[index].classList.add('active');
    }
    items.onmouseleave = function() {
        $$('.slidebar-menu').forEach(items => {
            items.classList.remove('active');
        })
    }
})
export default arrCategory;