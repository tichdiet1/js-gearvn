import { pageMain, $, $$, $$$ } from '../../../../store/index.js';
// import phần sài chung như giá tiền và sticker...
import getters from '../../../../store/getters.js';
// phần timeSaleElm để chạy file timeSaleElm, tại vì phần này liên quan tới phần sale là thời gian
// phần chỉnh sửa
const loopArrsale = pageMain.loopArrsale;

const arrProduct = pageMain.arrProduct;

// check product độc quyền theo id >= 9 && id <= xíu bỏ sung sản phẩm độc quyền. Trang bán chạy copy từ return độc quyền
const filteredProducts = arrProduct.filter(item => item.id >= 9 && item.id <= 15);
let stringSliceProduct = filteredProducts.map(item => {
    let { id, mainImg, sticker, title, discount, currentPrice, onSale, progress, sales } = item;
    let salesElm = progress === 'Đã bán' ? `Đã bán: ${sales}` : 'Vừa mở bán';
    const progressIconClass = progress === 'Đã bán' ? '' : 'icon progress-icon';
    let iconSold = `
        <svg width="16" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.39943 16.7753C5.49749 16.9703 5.45778 17.2063 5.30133 17.3585C5.14488 17.5106 4.90783 17.5437 4.71569 17.4402C2.9692 16.4998 1.79465 15.5487 1.13674 14.471C0.464139 13.3693 0.367829 12.1968 0.646145 10.9097L5.39943 16.7753ZM5.39943 16.7753C4.89503 15.7725 4.80178 15.0358 4.89423 14.4437C4.9882 13.8418 5.28316 13.3232 5.68383 12.7637C5.95783 12.381 6.17408 12.0003 6.34344 11.6508M5.39943 16.7753L6.34344 11.6508M6.34344 11.6508C6.36183 12.0334 6.34356 12.5009 6.25635 13.0603C6.22258 13.2769 6.33385 13.4902 6.53082 13.5865C6.72778 13.6828 6.96448 13.6395 7.11466 13.4798C7.84055 12.7078 8.26236 11.4993 8.48497 10.4409C8.59303 9.92713 8.65856 9.4274 8.68677 8.99492C10.7405 10.9421 11.4809 14.2642 10.1376 16.7633C10.033 16.9578 10.0685 17.198 10.2249 17.354C10.3813 17.51 10.6215 17.5449 10.8158 17.4398C13.0649 16.224 14.3789 14.8255 15.0184 13.3585C15.6589 11.8891 15.5946 10.4152 15.2091 9.10503C14.8254 7.80075 14.1196 6.64183 13.4459 5.76431C12.7776 4.89379 12.1105 4.2611 11.7684 4.02276C11.5821 3.89299 11.3318 3.90499 11.1588 4.05198C10.9858 4.19897 10.9336 4.44405 11.0315 4.64883C11.0637 4.716 11.091 4.7897 11.1134 4.86902C10.598 3.85925 9.86676 3.00784 9.17368 2.34659C8.58021 1.78037 7.99763 1.33723 7.56357 1.0355C7.34615 0.884368 7.16497 0.768007 7.03694 0.688754C6.97291 0.649112 6.92209 0.618704 6.88661 0.597826L6.84511 0.573674L6.83346 0.567017L6.82999 0.565054L6.82886 0.564415L6.82844 0.564181C6.82828 0.564089 6.82813 0.564005 6.58337 1L6.82813 0.564005C6.67509 0.47809 6.48821 0.478706 6.33574 0.565628C6.18327 0.652549 6.08753 0.813049 6.0835 0.988509C6.02938 3.34264 5.24321 5.60204 4.01193 7.39365C3.87056 6.87285 3.64761 6.38093 3.3177 5.80732C3.20794 5.61647 2.98625 5.51988 2.77174 5.56943C2.55722 5.61898 2.40036 5.80302 2.38543 6.02268C2.33255 6.80012 2.0296 7.52338 1.65494 8.32242C1.6136 8.41059 1.57127 8.49988 1.52841 8.59028C1.19449 9.2946 0.828337 10.0669 0.646149 10.9096L6.34344 11.6508Z" fill="#FDD835" stroke="#E30019" stroke-linejoin="round"></path></svg>
    `;
    // check icon
    const progressSold = progress !== 'Đã bán' ? '' : 'progressSold';
    // customDiscount giảm giá
    const customDiscount = getters.customPrice(discount);
    // customPrice giá
    const customPrice = getters.customPrice(currentPrice);
    // nếu là sticker !== '' ? 'd-block' : 'd-none';
    const stickerElm = getters.sticker(sticker);
    return `
        <div class="bg-white rounded-1 py-2 detailProductID" data-id="${ id }">
            <div class="product-image position-relative">
                <img src="${ mainImg }" alt="" class="w-100" height="166">
                <div class="product-sticker position-absolute bottom-0 start-0 ${ stickerElm }">
                    <img src="${ sticker }" alt="" width="62" height="62">
                </div>
            </div>
            <div class="product-detail pt-2 px-12px pb-12px">
                <h3 class="product-title mb-0">
                    <a href="" class="text-decoration-none text-333333 fs-14px fw-600" tabindex="0">${ title }</a>
                </h3>
                <div class="prices mb-2">
                    <span class="fs-13px fw-400 text-6D6E72">
                        <del>${ customDiscount }đ</del>
                    </span>
                    <div class="price-currentPrice d-flex align-items-center">
                        <span class="fs-6 fw-600 text-E30019">${ customPrice }₫</span>
                        <div class="py-1 px-2 text-ffeded fs-13px ms-2">${ onSale }%</div>
                    </div>
                </div>
                <div class="progress-group bg-FF8D9B mt-2">
                    <div class="${ progressSold } d-flex align-items-center position-relative">
                        ${ progress === 'Đã bán' ? `<span class="iconSold">${ iconSold }</span>` : `<span class="${ progressIconClass }"></span>` }
                        <span class="progress-title ms-4 fs-12px fw-600 text-white d-flex align-items-center ps-2">${ salesElm }</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

// check product BuildPC theo id < 9
const filteredProductsBuildPC = arrProduct.filter(item => item.id < 9);
const stringSliceProductBuildPC = filteredProductsBuildPC.map(item => {
    let { id, mainImg, sticker, title, discount, currentPrice, onSale, progress, sales } = item;
    let salesElm = progress === 'Đã bán' ? `Đã bán: ${sales}` : 'Vừa mở bán';
    const progressIconClass = progress === 'Đã bán' ? '' : 'icon progress-icon';
    let iconSold = `
        <svg width="16" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.39943 16.7753C5.49749 16.9703 5.45778 17.2063 5.30133 17.3585C5.14488 17.5106 4.90783 17.5437 4.71569 17.4402C2.9692 16.4998 1.79465 15.5487 1.13674 14.471C0.464139 13.3693 0.367829 12.1968 0.646145 10.9097L5.39943 16.7753ZM5.39943 16.7753C4.89503 15.7725 4.80178 15.0358 4.89423 14.4437C4.9882 13.8418 5.28316 13.3232 5.68383 12.7637C5.95783 12.381 6.17408 12.0003 6.34344 11.6508M5.39943 16.7753L6.34344 11.6508M6.34344 11.6508C6.36183 12.0334 6.34356 12.5009 6.25635 13.0603C6.22258 13.2769 6.33385 13.4902 6.53082 13.5865C6.72778 13.6828 6.96448 13.6395 7.11466 13.4798C7.84055 12.7078 8.26236 11.4993 8.48497 10.4409C8.59303 9.92713 8.65856 9.4274 8.68677 8.99492C10.7405 10.9421 11.4809 14.2642 10.1376 16.7633C10.033 16.9578 10.0685 17.198 10.2249 17.354C10.3813 17.51 10.6215 17.5449 10.8158 17.4398C13.0649 16.224 14.3789 14.8255 15.0184 13.3585C15.6589 11.8891 15.5946 10.4152 15.2091 9.10503C14.8254 7.80075 14.1196 6.64183 13.4459 5.76431C12.7776 4.89379 12.1105 4.2611 11.7684 4.02276C11.5821 3.89299 11.3318 3.90499 11.1588 4.05198C10.9858 4.19897 10.9336 4.44405 11.0315 4.64883C11.0637 4.716 11.091 4.7897 11.1134 4.86902C10.598 3.85925 9.86676 3.00784 9.17368 2.34659C8.58021 1.78037 7.99763 1.33723 7.56357 1.0355C7.34615 0.884368 7.16497 0.768007 7.03694 0.688754C6.97291 0.649112 6.92209 0.618704 6.88661 0.597826L6.84511 0.573674L6.83346 0.567017L6.82999 0.565054L6.82886 0.564415L6.82844 0.564181C6.82828 0.564089 6.82813 0.564005 6.58337 1L6.82813 0.564005C6.67509 0.47809 6.48821 0.478706 6.33574 0.565628C6.18327 0.652549 6.08753 0.813049 6.0835 0.988509C6.02938 3.34264 5.24321 5.60204 4.01193 7.39365C3.87056 6.87285 3.64761 6.38093 3.3177 5.80732C3.20794 5.61647 2.98625 5.51988 2.77174 5.56943C2.55722 5.61898 2.40036 5.80302 2.38543 6.02268C2.33255 6.80012 2.0296 7.52338 1.65494 8.32242C1.6136 8.41059 1.57127 8.49988 1.52841 8.59028C1.19449 9.2946 0.828337 10.0669 0.646149 10.9096L6.34344 11.6508Z" fill="#FDD835" stroke="#E30019" stroke-linejoin="round"></path></svg>
    `;
    // check icon, nếu có đã bán thì sẽ xuất lớp phủ màu đỏ đã bán w-85 round bg
    const progressSold = progress !== 'Đã bán' ? '' : 'progressSold';
    // customDiscount giảm giá
    const customDiscount = getters.customPrice(discount);
    // customPrice giá
    const customPrice = getters.customPrice(currentPrice);
    // nếu là sticker !== '' ? 'd-block' : 'd-none';
    const stickerElm = getters.sticker(sticker);
    return `
        <div class="product-enlarge bg-white h-100 detailProductID" data-id="${ id }">
            <div class="product-image position-relative">
                <img src="${ mainImg }" alt="" class="w-100" height="166">
                <div class="product-sticker position-absolute bottom-0 start-0 ${ stickerElm }">
                    <img src="${ sticker }" alt="" width="127" height="62">
                </div>
            </div>
            <div class="product-detail pt-2 px-12px pb-12px">
                <h3 class="product-title mb-0">
                    <a href="" class="text-decoration-none text-333333 fs-14px fw-600">
                        ${ title }
                    </a>
                </h3>
                <div class="prices mb-2">
                    <span class="fs-13px fw-400 text-6D6E72">
                        <del>${ customDiscount }₫</del>
                    </span>
                    <div class="price-currentPrice d-flex align-items-center">
                        <span class="fs-6 fw-600 text-E30019">${ customPrice }₫</span>
                        <div class="py-1 px-2 text-ffeded fs-13px ms-2">${ onSale }%</div>
                    </div>
                </div>
                <div class="progress-group bg-FF8D9B mt-2">
                    <div class="${ progressSold } d-flex align-items-center position-relative">
                        ${ progress === 'Đã bán' ? `<span class="iconSold">${ iconSold }</span>` : `<span class="${ progressIconClass }"></span>` }
                        <span class="progress-title ms-4 fs-12px fw-600 text-white d-flex align-items-center ps-2">${ salesElm }</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

let resultStringLoop;
// phải tạo 1 biến lưu trữ bên ngoài vòng lặp for, tại vì ở đây chỉ muốn xuất 1 tk mà thôi
resultStringLoop = loopArrsale.map((item) => {
    let { title, RightHeading } = item
    // console.log(stringSliceProductBuildPC); // product-enlarge bg-white h-100
    // console.log(stringSliceProduct);  // bg-white rounded-1 py-2
    let checkImg;
    if(title === 'SẢN PHẨM ĐỘC QUYỀN - BÁN CHẠY') {
        checkImg = `
            <div class="slider-monopoly">
                ${ stringSliceProduct }
            </div>
            <div class="pt-4 pb-2 text-center">
                <button class="fs-6 fw-700 rounded-8px bg-0a0c8f px-50px py-7px border-0 text-white">Xem thêm khuyến mãi</button>
            </div>
        `;
    } else if(title === 'BUILD PC NHẬN QUÀ LÊN ĐẾN 20 TRIỆU!!!') {
        checkImg = `
            <div class="col-lg-3 w-30" style="height: 297px;">
                <div>
                    <img src="${ item.imgLarge }" alt="" class="h-100 w-100">
                </div>
            </div>
            <div class="col-lg-7 w-67">
                <div class="image-slider position-relative">
                    ${ stringSliceProductBuildPC }
                </div>
            </div>
        `;
    }

    return `
            <div class="container">
                <div class="saleProduct-group pb-3">
                    <div class="saleProduct-heading bg-0a0c8f rounded-top">
                        <div class="d-flex align-items-center justify-content-between py-12px px-3">
                            <div class="saleProduct-times d-flex align-items-center column-gap6px">
                                <span class="saleProduct-time rounded-2 bg-white fs-14px fw-700 py-2 px-9px">
                                    <span class="saleProduct-day"></span>
                                </span>
                                <span class="fs-14px fw-700 text-white">:</span>
                                <span class="saleProduct-time rounded-2 bg-white fs-14px fw-700 py-2 px-9px">
                                    <span class="saleProduct-hour"></span>
                                </span>
                                <span class="fs-14px fw-700 text-white">:</span>
                                <span class="saleProduct-time rounded-2 bg-white fs-14px fw-700 py-2 px-9px">
                                    <span class="saleProduct-minute"></span>
                                </span>
                                <span class="fs-14px fw-700 text-white">:</span>
                                <span class="saleProduct-time rounded-2 bg-white fs-14px fw-700 py-2 px-9px">
                                    <span class="saleProduct-second"></span>
                                </span>
                                <span class="product-icon mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="36" viewBox="0 0 20 36" fill="none">
                                        <path d="M18.5035 15.4361H12.7737L12.769 15.4448H11.7322L18.6819 0L0.876617 19.807H7.67327L7.30312 20.7819L1.53845 36L18.5035 15.4361Z" fill="#FFC306"></path>
                                        <path d="M0.87663 19.807L0 20.7819H7.30314L7.67329 19.807H0.87663Z" fill="#FFAD00"></path>
                                        <path d="M12.769 15.4448L12.7737 15.4361H12.769L18.6819 0L11.7322 15.4448H12.769Z" fill="#FFAD00"></path>
                                        <path d="M20 15.4361H18.5035L1.53845 36L20 15.4361Z" fill="#FFAD00"></path>
                                        <path d="M17.6491 1.61224C17.6491 1.61224 2.40319 18.456 1.9086 19.3774C1.90939 19.3774 15.8681 4.08133 17.6491 1.61224Z" fill="#FFEE12"></path>
                                        <path d="M12.0802 15.6871C12.0802 15.6871 15.2491 15.444 17.7529 15.6871C17.7521 15.6871 14.8987 15.8964 12.0802 15.6871Z" fill="#FFEE12"></path>
                                    </svg>
                                </span>
                                <h4 class="product-text mb-0">
                                    <a href="" class="text-decoration-none text-FFEE12 fw-900 fs-3">${ item.title }</a>
                                </h4>
                            </div>
                            <div class="product-dayMonthyear d-flex align-items-center column-gap6px">
                                <div class="dayMonthyear text-white fs-16px fw-500 p-10px">
                                    <a class="text-decoration-none text-white">
                                        ${ RightHeading }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-body p-3">
                        <div class="row">
                            ${ checkImg }
                        </div>
                    </div>
                </div>
            </div>
    `;
});


export { resultStringLoop };
export default arrProduct