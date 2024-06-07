import { pageMain, $$, $$$ } from '../../../store/index.js';
import getters from '../../../store/getters.js';
const arrProductElm = pageMain.arrProduct;
const filtersArrProductElm = arrProductElm.filter(item => item.id >= 28 && item.id <= 42);
const mapFiltersArrProductElm = filtersArrProductElm.map((items) => {
    let { id, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;

    let svgGiftHotElm = getters.svggiftHot(svgGiftHot);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);
    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })
    let stringProduct = `
        <div class="proloop px-1px detailProductID" data-id="${ id }">
            <div class="proloop-block rounded-1 bg-white border h-100 pb-10px">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgGiftHotElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="${ mainImg }">
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62" 
                            lazy-src="${ sticker }">
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px mb-10px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    return stringProduct;
}).join('');

const filterLapTopGaming = arrProductElm.filter(item => item.id >= 43 && item.id <= 57);
const mapFilterLapTopGaming = filterLapTopGaming.map((items) => {
    let { id, svgInstallment, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;

    let svgInstallmentElm = getters.svgInstallment(svgInstallment);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);
    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })
    return `
        <div class="proloop px-1px detailProductID" data-id="${ id }">
            <div class="proloop-block rounded-1 bg-white border h-100 pb-10px">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgInstallmentElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="${ mainImg }">
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62"
                            lazy-src="${ sticker }">
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

const filterLapTopOffice = arrProductElm.filter(item => item.id >= 58 && item.id <= 72);
const mapFilterLapTopOffice = filterLapTopOffice.map((items) => {
    let { id, svgInstallment, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;

    let svgInstallmentElm = getters.svgInstallment(svgInstallment);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);
    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })
    return `
        <div class="proloop px-1px detailProductID" data-id="${ id }">
            <div class="proloop-block rounded-1 bg-white border h-100 pb-10px">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgInstallmentElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="${ mainImg }">
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62"
                            lazy-src="${ sticker }">
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px mb-10px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

const filterLapTopMouse = arrProductElm.filter(item => item.id >= 73 && item.id <= 87);
const mapFilterLapTopMouse = filterLapTopMouse.map((items) => {
    let { id, svgInstallment, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;

    let svgInstallmentElm = getters.svgInstallment(svgInstallment);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);

    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })
    return `
        <div class="proloop px-1px detailProductID" data-id="${ id }">
            <div class="proloop-block rounded-1 bg-white border h-100 pb-10px">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgInstallmentElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="${ mainImg }">
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62"
                            lazy-src="${ sticker }">
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px mb-10px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

const filterLapTopKeyboard = arrProductElm.filter(item => item.id >= 88 && item.id <= 102);
const mapFilterLapTopKeyboard = filterLapTopKeyboard.map((items) => {
    let { id, svgInstallment, svgGiftHot, svgGift, preOrder, mainImg, sticker, title, discount, currentPrice, onSale, progress, svgFire, sales, evaluateStar, evaluate, technical } = items;

    let svgInstallmentElm = getters.svgInstallment(svgInstallment);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);
    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })
    return `
        <div class="proloop px-1px detailProductID" data-id="${ id }">
            <div class="proloop-block rounded-1 bg-white border h-100 pb-10px">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgInstallmentElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="${ mainImg }" />
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62"
                            lazy-src="${ sticker }" />
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px mb-10px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');




// --------------------------fix 1 ngày-----------------------------
const filterLapTopScreenKey1 = arrProductElm.filter(item => item.id >= 103 && item.id <= 117);
const filterLapTopScreenKey2 = arrProductElm.filter(item => item.id >= 118 && item.id <= 132);

const mapFilterLapTopScreenKey1 = filterLapTopScreenKey1.map(item => ({
    id: item.id,
    svgInstallment: item.svgInstallment,
    svgGiftHot: item.svgGiftHot,
    preOrder: item.preOrder,
    svgGift: item.svgGift,
    sticker: item.sticker,
    title: item.title,
    discount: item.discount,
    currentPrice: item.currentPrice,
    onSale: item.onSale,
    progress: item.progress,
    svgFire: item.svgFire,
    sales: item.sales,
    evaluateStar: item.evaluateStar,
    evaluate: item.evaluate,
    technical: item.technical,
  }));
  const mapFilterLapTopScreenKey2 = filterLapTopScreenKey2.map(item => ({
    id: item.id,
    svgInstallment: item.svgInstallment,
    svgGiftHot: item.svgGiftHot,
    preOrder: item.preOrder,
    svgGift: item.svgGift,
    sticker: item.sticker,
    title: item.title,
    discount: item.discount,
    currentPrice: item.currentPrice,
    onSale: item.onSale,
    progress: item.progress,
    svgFire: item.svgFire,
    sales: item.sales,
    evaluateStar: item.evaluateStar,
    evaluate: item.evaluate,
    technical: item.technical,
  }));
const mapfilterContinue = filterLapTopScreenKey1.map((items, index) => {
    let string = `
        <div class="proloop px-1px">
            ${mapFilterLapTopScreen(mapFilterLapTopScreenKey1, 1, 'proloop-block rounded-1 bg-white border h-100 mb-10px detailProductID', filterLapTopScreenKey1[index]?.id)}
            ${mapFilterLapTopScreen(mapFilterLapTopScreenKey2, 1, 'proloop-block rounded-1 bg-white border h-100 mb-10px detailProductID', filterLapTopScreenKey2[index]?.id)}
        </div>
    `;
    return string;
}).join('');

function mapFilterLapTopScreen(items, limit, className, startId) {
    let id = '';
    let svgInstallment = '';
    let svgGiftHot = '';
    let preOrder = '';
    let svgGift = '';
    let sticker = '';
    let title = '';
    let discount = 0;
    let currentPrice = 0;
    let onSale = 0;
    let progress = '';
    let svgFire = '';
    let sales = 0;
    let evaluateStar = '';
    let evaluate = 0;
    let technical = Array;
    items.forEach(item => {
        if(item.id == startId) {
            id += item.id;
            svgInstallment += item.svgInstallment;
            svgGiftHot += item.svgGiftHot;
            preOrder += item.preOrder;
            svgGift += item.svgGift;
            sticker += item.sticker;
            title += item.title;
            discount += item.discount;
            currentPrice += item.currentPrice;
            onSale += item.onSale;
            progress += item.progress;
            svgFire += item.svgFire;
            sales += item.sales;
            evaluateStar += item.evaluateStar;
            evaluate += item.evaluate;
            technical = item.technical;
        }
    })
    let svgInstallmentElm = getters.svgInstallment(svgInstallment);
    let svgGiftElm = getters.svgGift(svgGift);
    let svgPreOrderElm = getters.preOrder(preOrder);
    let stickerElm = getters.sticker(sticker);
    let progressElm = getters.progress(progress, svgFire);
    let customPriceDiscountElm = getters.customPrice(discount);
    let customPriceElm = getters.customPrice(currentPrice);
    
    let stringTechnical = '';
    technical.forEach(items => {
        let { svg, nameSvg } = items;
        stringTechnical += `
            <div class="proloop-technical--line d-flex align-items-center">
                ${ svg }
                <span class="fs-12px ms-1">${ nameSvg }</span>
            </div>
        `;
    })

    let count = 0;
    let output = '';
    for (let i = 0; i < items.length && count < limit; i++) {
        output += ` 
            <div class="${className}" data-id="${ id }">
                <div class="proloop-heading p-10px position-relative">
                    <div class="proloop-label pb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ svgInstallmentElm }
                            ${ svgPreOrderElm }
                            <div class="proloop-label--gift ms-3">
                                ${ svgGiftElm }
                            </div>
                        </div>
                    </div>
                    <div class="proloop-img rounded-1 bg-white">
                        <img alt="" class="w-100 object-fit-contain" height="208"
                        lazy-src="/DAJS/src/assets/product/mainProduct-img-id-${ startId }.webp" />
                        <div class="sticker_left_bottom position-absolute ${ stickerElm }">
                            <img alt="" width="100%" height="62"
                            lazy-src="${ sticker }">
                        </div>
                    </div>
                </div>
                <div class="proloop-detail px-3 pb-3 pt-6px">
                    <div class="proloop-label pb-10px mt-1 mb-10px">
                        <div class="proloop-label--tag d-flex align-items-center">
                            ${ progressElm }
                        </div>
                    </div>
                    <h3 class="mb-2 proloop-title fs-14px mb-10px">${ title }</h3>
                    <div class="proloop-technical bg-ececec text-6D6E72 py-1 px-2 d-flex flex-wrap mb-2">
                        ${ stringTechnical }
                    </div>
                    <div class="proloop-price">
                        <div class="proloop-price--compare fs-13px fw-500 text-6D6E72">
                            <del>${ customPriceDiscountElm }₫</del>
                        </div>
                        <div class="proloop-price--default d-flex align-items-center">
                            <span class="proloop-price--highlight fs-6 text-E30019 fw-600">${ customPriceElm }₫</span>
                            <span class="proloop-label--on-sale text-E30019 fs-13px fw-600 ms-2 px-1 bg-FFEDED rounded-1">${ onSale }%</span>
                        </div>
                    </div>
                    <div class="proloop-rating d-flex align-items-center">
                        <span class="number color-FF8A00 fs-12px fw-600">${ evaluateStar }</span>
                        <span class="icon">
                            <svg fill="#FF8A00" class="vertical-align-inherit" width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path></svg>
                        </span>
                        <span class="count text-6D6E72 fs-12px fw-600 ms-2">(${ evaluate } đánh giá)</span>
                    </div>
                </div>
            </div>
        `;
        count++;
    }
    return output;
}
// ---------------------------------------------------------------






let mapLoopArrProductsMain = pageMain.loopArrProductsMain.map(items => {
    let { title, 'cate-list': cateList, classElm } = items;

    let mapCateList = cateList.map(items => {
        let { item } = items
        return `
            <li class="list-group">
                <a href="" class="text-decoration-none hover-decoration text-333333 fs-18px fw-400 text-nowrap py-5px px-3">${ item }</a>
            </li>
        `;
    }).join('');
    let checkTitle;
    if(title === 'PC bán chạy') {
        checkTitle = mapFiltersArrProductElm;
    } else if(title === 'Laptop gaming bán chạy') {
        checkTitle = mapFilterLapTopGaming;
    } else if(title === 'Laptop văn phòng bán chạy') {
        checkTitle = mapFilterLapTopOffice;
    } else if(title === 'Chuột bán chạy') {
        checkTitle = mapFilterLapTopMouse;
    } else if(title === 'Bàn phím bán chạy') {
        checkTitle = mapFilterLapTopKeyboard
    } else if(title === 'Màn hình chính hãng') {
        checkTitle = mapfilterContinue
    }
    return `
        <div class="container">
            <div class="productsMain-group bg-white rounded-1 ps-2 pe-1">
                <div class="section-heading ps-24px pe-28px py-12px d-flex justify-content-between">
                    <div class="box-left d-flex align-items-center">
                        <h3 class="hTitle pe-21px mb-0">
                            <a href="" class="text-decoration-none fs-4 text-333333">${ title }</a>
                        </h3>
                        <div class="box-subHeader position-relative d-flex align-items-center ps-21px">
                            <svg width="22" height="14" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5 4H16V2C16 0.9 15.1 0 14 0H2C0.9 0 0 0.9 0 2V11C0 12.1 0.9 13 2 13C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H21C21.55 13 22 12.55 22 12V8.67C22 8.24 21.86 7.82 21.6 7.47L19.3 4.4C19.11 4.15 18.81 4 18.5 4ZM5 14C4.45 14 4 13.55 4 13C4 12.45 4.45 12 5 12C5.55 12 6 12.45 6 13C6 13.55 5.55 14 5 14ZM18.5 5.5L20.46 8H16V5.5H18.5ZM17 14C16.45 14 16 13.55 16 13C16 12.45 16.45 12 17 12C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14Z" fill="#FF3C53"></path>
                            </svg>
                            <h3 class="fs-18px fw-600 text-333333 mb-0 ms-2">Trả góp 0%</h3>
                        </div>
                    </div>
                    <div class="box-right d-flex align-items-center">
                        <div class="box-cate">
                            <ul class="mb-0 ps-0 d-flex align-items-center">
                                ${ mapCateList }
                            </ul>
                        </div>
                        <div class="box-link">
                            <a href="" class="text-decoration-none hover-text text-1982F9 fs-17px fw-500">Xem tất cả</a>
                        </div>
                    </div>
                </div>
                <div class="slider-productsMain pb-2 ${ classElm }">
                    ${ checkTitle }
                </div>
            </div>
        </div>
    `;
})

let main = document.querySelector('main');
mapLoopArrProductsMain.forEach((item) => {
    let section = document.createElement('section');
    section.setAttribute('class', 'section-productsMain pb-3');
    section.innerHTML = item;
    main.insertBefore(section, main.children[10]);
})

$('.slider-productsMain').slick({
    // chạy vô hạn
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: `
    <button class="button hover-button button-prev">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?--><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27"></x:xmpmeta><!--?xpacket end="w"?--></metadata><g display="none"><rect x="1" y="1" display="inline" fill="#000000" width="48" height="48"></rect></g><g><g><polygon points="34.675,47.178 12.497,25 34.675,2.822 37.503,5.65 18.154,25 37.503,44.35   "></polygon></g></g></svg>
    </button>`,
    nextArrow: `
    <button class="button hover-button button-next">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><polygon points="6.379,20.908 7.546,22.075 17.621,12 7.546,1.925 6.379,3.092 15.287,12 "></polygon></svg>
    </button>`,
    // không muốn người người đặt chuột lên sản phẩm rồi kéo
    draggable: false,
    autoplay: true,
    autoplaySpeed: 2000,
    // dots: true,
    // nhận 2 dot mà thôi
    // customPaging: function(slider, i) {
    //     if (i % 2 === 0) {
    //         return '<button class="dot"></button>';
    //     }
    //     return '';
    // }
})
export default pageMain;