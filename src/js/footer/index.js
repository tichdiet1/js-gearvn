import { pageMain, $, $$$ } from "../../store/index.js";
const arrFooter = pageMain.arrFooter;
const arrCopyright = pageMain.arrCopyright;
const mapArrFooter = arrFooter.map((item) => {
    let { title, ListItems } = item;
    const filterListItems = ListItems.filter(item => item.item);
    const mapListItems = filterListItems.map(list => {
        return `
            <li class="list-group align-items-center flex-row">
                <a href="#" class="footerTitle-link footerTitle-hover text-decoration-none text-dark fs-14px text-nowrap fw-600 fs-14px"
                    title="Giới thiệu">${ list.item }
                </a>
            </li>
        `;
    }).join('');
    const filtersListItemOne = ListItems.filter(item => item.list);
    let titleListItemOne = '';
    const mapFiltersListItemOne = filtersListItemOne.map(item => {
        titleListItemOne = item.titleList;
        const mapList = item.list.map(item => {
            return `
                <li class="list-group">
                    <img src="${ item.mainImg }" alt="" width="59" />
                </li>
            `;
        }).join('');
        return `
            <div class="objectFive">
                <div class="hTitle">
                    <h4 class="fs-14px fw-600 text-nowrap">${ item.titleList }</h4>
                </div>
                <div class="footer-content">
                    <ul class="ps-0 mb-0 d-flex align-items-center flex-wrap pb-3" style="width: 250px; gap: 4px;">
                        ${ mapList }
                    </ul>
                </div>
            </div>
        `;
    }).join('')

    const checkMenuList = item.title ? ` ${ mapListItems } ` : ` ${ mapFiltersListItemOne } `;
    return `
        <div class="footer-col">
            <div class="footer-listGroup">   
                <div class="footer-title">
                    ${ item.title ? `<h4 class="fs-14px fw-600 text-nowrap">${ title }</h4>` : '' }
                </div>
                ${ item.title ? '<menu class="mb-0 ps-0">' + mapListItems + '</menu>' : `<div class="footer-block">${ mapFiltersListItemOne }</div>` }
            </div>
        </div>
    `;
}).join('');

const mapArrCopyright = arrCopyright.map(items => {
    let { title, item, mainImg } = items;
    const mapMainImg = mainImg.map(imgs => {
        let { img } = imgs;
        return `
            <a href="#" class="text-decoration-none">
                <img src="${ img }"
                    alt="face" class="w-100">
            </a>
        `;
    }).join('');
    return `
        <div class="copyright-left d-flex align-items-center">
            <h4 class="mb-0 fs-14px">${ title }</h4>
            <div class="copyright-firmGroup d-flex ms-3">
                ${ mapMainImg }
            </div>
        </div>
    `;
}).join('');
let resultFooter = `
    <div class="main-footer bg-white">
        <div class="container">
            <div class="wrapper-footer border-bottom py-5">
                <div class="row row-cols-lg-5 col-sm-12 col-md-6 w-100">
                    ${ mapArrFooter }
                </div>
            </div>
        </div>
    </div>
    <div class="copyright-footer bg-white">
        <div class="container">
            <div class="wrapper-copyright d-flex justify-content-between align-items-center">
                ${ mapArrCopyright }
                <div class="copyright-right">
                    <a href="#" class="copyright-link text-decoration-none">
                        <img src="//theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=3712"
                            alt="Bộ Công Thương" class="">
                    </a>
                </div>
            </div>
        </div>
    </div>
`;
let footer = document.createElement('footer');
footer.setAttribute('class', 'footer pt-3');
footer.innerHTML = resultFooter;

$$$('wrapper').appendChild(footer)
export default pageMain;