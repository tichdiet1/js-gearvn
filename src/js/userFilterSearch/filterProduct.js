import { pageMain, $, $$ } from '../../store/index.js';
import getters from '../../store/getters.js';


let saveRsArr = sessionStorage.getItem('saveSearchProduct') ? JSON.parse(sessionStorage.getItem('saveSearchProduct')) : [];

function handleArrFilterProduct(arr) {
    let mapSaveRsArr = arr.map(items => {
        let { svgInstallment, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;
    
        let svgInstallmentElm = getters.svgInstallment(svgInstallment);
        let svgGiftElm = getters.svgGift(svgGift);
        let svgPreOrderElm = getters.preOrder(preOrder);
        let stickerElm = getters.sticker(sticker);
        let progressElm = getters.progress(progress, svgFire);
        let customPriceDiscountElm = getters.customPrice(discount);
        let customPriceElm = getters.customPrice(currentPrice);
        
        let stringTechnical = '';
        if (technical.length === 0) {
            let mapTechnicalElm = technical.map(items => {
                let { svg, nameSvg } = items;
                return `
                    <div class="detail-technical-content">
                        <div class="detail-technical-line d-flex align-items-center">
                            ${ svg }
                            <span class="fs-12px fw-400 ms-5px">${ nameSvg }</span>
                        </div>
                    </div>
                `;
            }).join('');
            stringTechnical += mapTechnicalElm;
        } else {
            let mapTechnicalElm = technical.map(items => {
                let { svg, nameSvg } = items;
                return `
                    <div class="detail-technical-content">
                        <div class="detail-technical-line d-flex align-items-center">
                            ${ svg }
                            <span class="fs-12px fw-400 ms-5px">${ nameSvg }</span>
                        </div>
                    </div>
                `;
            }).join('');
            stringTechnical += mapTechnicalElm;
        }
        // phải có h-100 để không bị lỗi giao diện của product thụt ra thụt vào, đồng thời phải thêm container vào row
        return `
            <div class="col-lg-3 px-1">
                <div class="filter-product border rounded-1 h-100">
                    <div class="filter-product__heading">
                        <div class="product__heading-content p-10px position-relative">
                            <div class="gift-product d-flex justify-content-between align-items-center pb-10px">
                                ${ svgInstallmentElm }
                                ${ svgPreOrderElm }
                                ${ svgGiftElm }
                            </div>
                            <div class="proloop-img">
                                <img src="${ mainImg }" alt="" class="w-100 object-fit-contain" height="208">
                                <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                                    <img src="${ sticker }" alt="" width="100%" height="62">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter-product__content">
                        <div class="filter-product__detail pt-6px px-3 pb-3">
                            <div class="proloop-label--bottom">
                                ${ progressElm }
                            </div>
                            <h3 class="detail-title mb-2">
                                <a href="" class="text-decoration-none text-333333 fs-14px fw-600">${ title }</a>
                            </h3>
                            <div class="detail-technical rounded-3 d-flex align-items-center bg-ececec flex-wrap px-2 py-1" style="column-gap: 8px; row-gap: 2px;">
                                ${ stringTechnical }
                            </div>
                            <div class="prices">
                                <div class="prices-compare">
                                    <del class="text-109110114 fs-13px fw-400">${ customPriceDiscountElm }₫</del>
                                </div>
                                <div class="prices-default d-flex align-items-center">
                                    <div class="prices-highlight fs-6 fw-600 color-E30019">${ customPriceElm }₫</div>
                                    <span class="prices-on-sale color-E30019 border fs-13px bg-FFEDED ms-10px px-1 fw-400">${ onSale }%</span>
                                </div>
                            </div>
                            <div class="star-product d-flex align-items-center">
                                <span class="fw-600 fs-12px color-FF8A00">${ evaluateStar }</span>
                                <span class="icon-star-product lh-0 ms-2px me-2">
                                    <svg width="12" height="12" viewBox="0 0 12 13" fill="#FF8A00" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                                </span>
                                <span class="fs-12px fw-400">(${ evaluate } đánh giá)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    let section = document.createElement('section');
    section.setAttribute('class', 'section-userFilterSearch');
    let rsString = `
        <div class="userFilterSearch-container container pt-17px">
            <div class="userFilterSearch-group bg-white pt-4 pb-3">
                <div class="userFilterSearch-content">
                    <div class="row container px-12px" style="row-gap: 8px;">
                        ${ mapSaveRsArr }
                    </div>
                </div>
            </div>
            
        </div>
    `;
    section.innerHTML = rsString;
    let main = document.querySelector('main');
    // main.appendChild(section);
    main.insertBefore(section, $('.section-saleProduct'));
}

// mỗi lần click vào chữ xem thêm sản phẩm thì hiện ra 20 phẩm
let sliceArrProductTwenty = saveRsArr.slice(0, 20);
let sliceArrProductForty = saveRsArr.slice(20, 40);
let sliceArrProductSixty = saveRsArr.slice(40, 60);
let sliceArrProductEightty = saveRsArr.slice(60, 80);
let sliceArrProductOneHundredty = saveRsArr.slice(80, 100);
let sliceArrProductOneHundredTwenty = saveRsArr.slice(100, 120);
let sliceArrProductOneHundredForty = saveRsArr.slice(120, 140);
// phần hiển thị mặc định 20 sản phẩm đầu tiên
handleArrFilterProduct(sliceArrProductTwenty);
// phần appendChild chữ xem thêm sản phẩm
function createElmSeemove() {
    let div = document.createElement('div');
    div.setAttribute('class', 'jsClick-seemore');
    div.innerHTML = `
        <div class="jsClick-content text-center my-4">
            <button class="jsClick-btn mb-0 bg-white border-0 px-64px py-1 rounded-1 fs-14px fw-400" data-current="2">Xem thêm sản phẩm</button>
        </div>
    `;
    $$('.userFilterSearch-container').forEach(item => {
        item.appendChild(div);
    })
    // $('.userFilterSearch-container').appendChild(div);
}
createElmSeemove();
// jsclick btn xem thêm
let dataCurrent = $('.jsClick-btn').getAttribute('data-current');

function updataClick() {
    $('.jsClick-btn').addEventListener('click', function() {
        $('.jsClick-btn').remove();
        dataCurrent++;
        
        checkSeemore(dataCurrent);
    })
}
updataClick();
function checkSeemore(index) {
    if(index == 3) {
        console.log(sliceArrProductForty); // nếu mảng chỉ có 20 thì khi click chỉ có ra mảng rỗng
        if(sliceArrProductForty.length > 0) {
            handleArrFilterProduct(sliceArrProductForty);
            createElmSeemove()
            // tăng lên 1 để chạy index == 4
            updataClick();
        } else {
            // khi ra mảng rỗng thì tạo createElmSeemove
            createElmSeemove()
        }
    }
    if(index == 4) {
        if(sliceArrProductSixty.length > 0) {
            handleArrFilterProduct(sliceArrProductSixty);
            createElmSeemove()
            updataClick();
        } else {
            createElmSeemove();
        }
    }
    if(index == 5) {
        if(sliceArrProductEightty.length > 0) {
            handleArrFilterProduct(sliceArrProductEightty);
            createElmSeemove()
            updataClick();
        } else {
            createElmSeemove();
        }
    }
    if(index == 6) {
        if(sliceArrProductOneHundredty.length > 0) {
            handleArrFilterProduct(sliceArrProductOneHundredty);
            createElmSeemove()
            updataClick();
        } else {
            createElmSeemove();
        }
    }
    if(index == 7) {
        if(sliceArrProductOneHundredTwenty.length > 0) {
            handleArrFilterProduct(sliceArrProductOneHundredTwenty);
            createElmSeemove()
            updataClick();
        } else {
            createElmSeemove();
        }
    }
    if(index == 8) {
        if(sliceArrProductOneHundredForty.length > 0) {
            handleArrFilterProduct(sliceArrProductOneHundredForty);
            createElmSeemove()
        }
    }
}
export default $