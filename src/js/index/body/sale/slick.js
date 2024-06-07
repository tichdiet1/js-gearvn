import { pageMain, $$, $$$ } from '../../../../store/index.js';
// import phần sài chung như giá tiền và sticker...
import getters from '../../../../store/getters.js';
const arrProduct = pageMain.arrProduct;

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
                <img src="${ mainImg }" alt="" class="w-100 object-fit-contain" height="166">
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

const filterLapTopDealHoi = arrProduct.filter(item => item.id >= 133 && item.id <= 139);
const mapLapTopDealHoi = filterLapTopDealHoi.map(item => {
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
                <img src="${ mainImg }" alt="" class="w-100 object-fit-contain" height="166">
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

const filterSelling = arrProduct.filter(item => item.id > 15 && item.id <= 27);
const mapSelling = filterSelling.map(item => {
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
                <img src="${ mainImg }" alt="" class="w-100 object-fit-contain" height="166">
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

$$('.btn-clickmonopoly').forEach((item, index) => {
    item.onclick = function(e) {
        // hủy sự kiện slick ban đầu chạy mặc định sau đó kích hoạt khi click, nếu không hủy thì không thể xét lại sự kiện slick
        $('.slider-monopoly').slick('unslick')
        $$('.btn-clickmonopoly').forEach(item => {
            item.classList.remove('active');
        })
        $$('.btn-clickmonopoly')[index].classList.add('active');
        if(index === 0) {
            const sellingProducts = arrProduct.filter(item => item.id >= 9 && item.id <= 15);
            const stringsellingProducts = sellingProducts.map(() => {
                return `
                    ${ mapLapTopDealHoi }
                `
            }).join('');
            $('.slider-monopoly')[0].innerHTML = stringsellingProducts;
            // kích hoạt lại từ đầu như 1 hàm mới
            $('.slider-monopoly').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                draggable: false,
                prevArrow: `
                <button class="button hover-button button-prev">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?--><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27"></x:xmpmeta><!--?xpacket end="w"?--></metadata><g display="none"><rect x="1" y="1" display="inline" fill="#000000" width="48" height="48"></rect></g><g><g><polygon points="34.675,47.178 12.497,25 34.675,2.822 37.503,5.65 18.154,25 37.503,44.35   "></polygon></g></g></svg>
                </button>`,
                nextArrow: `
                <button class="button hover-button button-next">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><polygon points="6.379,20.908 7.546,22.075 17.621,12 7.546,1.925 6.379,3.092 15.287,12 "></polygon></svg>
                </button>`,
            });

            $$('.detailProductID').forEach(product => {
                product.addEventListener('click', function() {
                    // Lấy ID của sản phẩm từ thuộc tính data-id
                    const productId = product.dataset.id;
                    // Chuyển hướng đến trang chi tiết sản phẩm cụ thể
                    location.href = `/DAJS/src/components/product.html?id=${productId}`;
                })
            })
        } else if(index === 1) {
            const sellingProducts = arrProduct.filter(item => item.id >= 9 && item.id <= 15);
            const stringsellingProducts = sellingProducts.map(() => {
                return `
                    ${ stringSliceProduct }
                `
            }).join('');
            $('.slider-monopoly')[0].innerHTML = stringsellingProducts;
            // kích hoạt lại từ đầu như 1 hàm mới
            $('.slider-monopoly').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                draggable: false,
                prevArrow: `
                <button class="button hover-button button-prev">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?--><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27"></x:xmpmeta><!--?xpacket end="w"?--></metadata><g display="none"><rect x="1" y="1" display="inline" fill="#000000" width="48" height="48"></rect></g><g><g><polygon points="34.675,47.178 12.497,25 34.675,2.822 37.503,5.65 18.154,25 37.503,44.35   "></polygon></g></g></svg>
                </button>`,
                nextArrow: `
                <button class="button hover-button button-next">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><polygon points="6.379,20.908 7.546,22.075 17.621,12 7.546,1.925 6.379,3.092 15.287,12 "></polygon></svg>
                </button>`,
            });
            
            $$('.detailProductID').forEach(product => {
                product.addEventListener('click', function() {
                    // Lấy ID của sản phẩm từ thuộc tính data-id
                    const productId = product.dataset.id;
                    // Chuyển hướng đến trang chi tiết sản phẩm cụ thể
                    location.href = `/DAJS/src/components/product.html?id=${productId}`;
                })
            })
        } else if(index === 2) {
            const sellingProducts = arrProduct.filter(item => item.id > 15 && item.id <= 27);
            const stringsellingProducts = sellingProducts.map((item) => {
                /**
                 * - lý do là đã dùng $('.slider-monopoly'), nếu trong đây mà viết
                 * code bỏ vào hàm return như vầy thì đảm bảo lỗi, tại vì chúng ta
                 * đã dùng $('.slider-monopoly')[0].innerHTML = stringsellingProducts;
                 * chúng lại muốn innner nữa thì chết ngay.
                 * 
                 * <div class="slider-monopoly">
                        <div class="bg-white rounded-1 py-2">
                        </div>
                 * </div>
                 */
                return `
                    ${ mapSelling }
                `
            }).join('');
            $('.slider-monopoly')[0].innerHTML = stringsellingProducts;
            $('.slider-monopoly').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                draggable: false,
                prevArrow: `
                <button class="button hover-button button-prev">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?--><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27"></x:xmpmeta><!--?xpacket end="w"?--></metadata><g display="none"><rect x="1" y="1" display="inline" fill="#000000" width="48" height="48"></rect></g><g><g><polygon points="34.675,47.178 12.497,25 34.675,2.822 37.503,5.65 18.154,25 37.503,44.35   "></polygon></g></g></svg>
                </button>`,
                nextArrow: `
                <button class="button hover-button button-next">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><polygon points="6.379,20.908 7.546,22.075 17.621,12 7.546,1.925 6.379,3.092 15.287,12 "></polygon></svg>
                </button>`,
            });

            $$('.detailProductID').forEach(product => {
                product.addEventListener('click', function() {
                    // Lấy ID của sản phẩm từ thuộc tính data-id
                    const productId = product.dataset.id;
                    // Chuyển hướng đến trang chi tiết sản phẩm cụ thể
                    location.href = `/DAJS/src/components/product.html?id=${productId}`;
                })
            })
        }
        e.preventDefault();
    }
})

// slick Slider của BUILD PC NHẬN QUÀ LÊN ĐẾN 20 TRIỆU!!!
$('.image-slider').slick({
    // chạy vô hạn
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    dots: true,
    // nhận 2 dot mà thôi
    // customPaging: function(slider, i) {
    //     if (i % 2 === 0) {
    //         return '<button class="dot"></button>';
    //     }
    //     return '';
    // }
})

// slider của độc quyền: phải để đúng 7 tấm ảnh thì lúc click lần 1 sẽ chạy đến hình 2 rồi chạy tiếp. Lưu ý: đây không phải là click mới chạy tới hình 2 mà quan trọng div phải đúng 7 thằng
$('.slider-monopoly').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    draggable: false,
    prevArrow: `
    <button class="button hover-button button-prev" style="left: -5px;">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?--><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27"></x:xmpmeta><!--?xpacket end="w"?--></metadata><g display="none"><rect x="1" y="1" display="inline" fill="#000000" width="48" height="48"></rect></g><g><g><polygon points="34.675,47.178 12.497,25 34.675,2.822 37.503,5.65 18.154,25 37.503,44.35   "></polygon></g></g></svg>
    </button>`,
    nextArrow: `
    <button class="button hover-button button-next" style="right: -5px;">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><polygon points="6.379,20.908 7.546,22.075 17.621,12 7.546,1.925 6.379,3.092 15.287,12 "></polygon></svg>
    </button>`,
});

// phần để tham khảo
// Đăng ký lại sự kiện click trên các nút button của slick slider
// $('.slider-monopoly .slick-next, .slider-monopoly .slick-prev').on('click', handleButtonClick);
// Gắn sự kiện click vào phần tử trigger (ví dụ: button)
// $('.slider-monopoly').on('click', function() {
    // để than khảo hiểu hơn về !
//     // ban đầu clicked = false mà code chạy từ trên xuống dưới, nếu không phải là false thì !clicked = true, nên ban đầu nhận giá trị khác false, ngược lại click thì trả về là !clicked không true thì là false
//   if (!clicked) {
//    console.log('khác false');
//   } else {
//     console.log('không khác false');
//   }
//   // Đánh dấu là đã nhấp chuột
//   clicked = true;
// });

export default pageMain;