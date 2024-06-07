import { pageMain, $, $$, $$$ } from "../../store/index.js";
import { arrImgSliderProduct } from "../../store/state.js";
import getters from '../../store/getters.js';
// rút kinh nghiệm
// '1' === 1 false
// '1' == 1 true
// Mình bị lỗi ở product.id === productId nếu sài 3 dấu bằng thì so sánh tuyệt đối, 2 dấu bằng thì 

let section = document.createElement("section");
section.setAttribute("class", "section-detailProduct");

let main = document.querySelector("main");
main.appendChild(section);

const arrProductElm = pageMain.arrProduct;
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Tìm sản phẩm phù hợp với productId
const selectedProduct = arrProductElm.find(product => product.id == productId);
 // Tìm slider phù hợp với productId
 const selectedSlider = arrImgSliderProduct.find(slider => slider.id === parseInt(productId));
 console.log(selectedSlider);

// Hiển thị thông tin sản phẩm trên trang
const productDetails = $(".section-detailProduct");
if (selectedProduct) {
    // phá hủy object để lấy key trong object là mainImg
    let { mainImg } = selectedSlider;
    // loop imgs-large
    const mapImgSliderLarge = mainImg.map(imgs => {
        // phá hủy object để lấy key
        let { img } = imgs;
        return `
            <div class="product-gallery--item">
                <img src="${ img }" alt="" class="h-100 w-100 card-img-top card-img-bottom" />
            </div>
        `;
    }).join('');

    // loop imgs-small
    const mapImgSliderSmall = mainImg.map((items, index) => {
        let { img } = items;
        let className = index === 0 ? "product-thumb active" : "product-thumb";
        return `
            <div class="${className}">
                <img src="${img}" alt="" class="w-100 h-100" />
            </div>
        `;
    }).join("");


  const { title, discount, currentPrice, onSale, evaluate, evaluateStar } = selectedProduct;
  let customPriceElm = getters.customPrice(currentPrice);
  let customPriceDiscountElm = getters.customPrice(discount);

  productDetails.innerHTML = `
  <div class="container">
  <div class="product-inner bg-white rounded-1 shadow-sm">
      <div class="row container">
          <div class="col-4 p-4 border-end">
              <div class="product-gallery--inner overflow-hidden">
                  <div class="product-gallery--slide btn-product-hover w-100 position-relative cursor-pointer">
                      <div class="btn-products btn-button-handleEvent">
                          <button class="click-button btn-product-left position-absolute rounded-circle border-0 top-50 z-index100">
                              <svg width="15" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.993 511.993" style="transform: rotate(180deg);"><g><g><g><path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z"></path></g></g><g><g><path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z"></path></g></g></g></svg>
                          </button>
                          <button class="click-button btn-product-right position-absolute rounded-circle border-0 top-50 z-index100">
                              <svg width="15" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.993 511.993"><g><g><g><path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z"></path></g></g><g><g><path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z"></path></g></g></g></svg>
                          </button>
                      </div>
                      <div class="swiper-wrapper transform-product-handleEvent d-flex">
                         ${ mapImgSliderLarge }
                      </div>
                  </div>
                  <div class="product-thumb--group btn-product-hover position-relative">
                      <div class="btn-products">
                          <button class="click-button btn-product-left btn-small position-absolute rounded-circle border-0 top-50 z-index100 d-flex align-items-center justify-content-center">
                              <svg width="15" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.993 511.993" style="transform: rotate(180deg);"><g><g><g><path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z"></path></g></g><g><g><path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z"></path></g></g></g></svg>
                          </button>
                          <button class="click-button btn-product-right btn-small position-absolute rounded-circle border-0 top-50 z-index100 d-flex align-items-center justify-content-center">
                              <svg width="15" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.993 511.993"><g><g><g><path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z"></path></g></g><g><g><path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z"></path></g></g></g></svg>
                          </button>
                      </div>
                      <div class="product-gallery--thumb w-100 h-100 cursor-pointer mt-4">
                          <div class="swiper-wrapper d-flex" style="column-gap: 15px;">
                              ${ mapImgSliderSmall }
                          </div>
                      </div>
                  </div>
                  <div class="promotion-code-banner">
                      <a href="" class="text-decoration-none">
                          <img src="/DAJS/src/assets/product/pageProduct/pageProductMain-left-hinh-1.webp" class="w-100" height="123" alt="" />
                      </a>
                  </div>
              </div>
          </div>
          <div class="col-8 p-4">
              <div class="info-wrapper">
                  <div class="info-name">
                      <h1 class="mb-2 fs-4 fw-500">${ title }</h1>
                  </div>
                  <div class="info-Evaluates d-flex align-items-center mb-3">
                      <span class="info-number color-FF8A00">${ evaluateStar }</span>
                      <span class="icon lh-0">
                          <svg width="12" height="12" class="ms-2px me-3" fill="#FF8A00" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.09627 11.6195L2.82735 8.16864L0.268563 5.80414C0.268563 5.80414 -0.096986 5.48462 0.0248693 5.03728C0.146725 4.58994 0.634105 4.58994 0.634105 4.58994L4.04582 4.27041L5.38614 1.01124C5.38614 1.01124 5.5689 0.5 5.99538 0.5C6.42185 0.5 6.60461 1.01124 6.60461 1.01124L7.94493 4.27041L11.4785 4.58994C11.4785 4.58994 11.844 4.65385 11.9659 5.03728C12.0877 5.42071 11.844 5.67633 11.844 5.67633L9.1634 8.16864L9.89448 11.7473C9.89448 11.7473 10.0163 12.1308 9.71171 12.3864C9.40709 12.642 8.91971 12.3864 8.91971 12.3864L5.99538 10.5331L3.13197 12.3864C3.13197 12.3864 2.70551 12.642 2.33996 12.3864C1.97442 12.1308 2.09627 11.6195 2.09627 11.6195Z" fill="#FF8A00"></path>
                          </svg>
                      </span>
                      <a href="" class="info-Evaluate text-decoration-none text-1982F9 fw-400 fs-6">Xem đánh giá</a>
                  </div>
                  <div class="product-price d-flex align-items-center mb-3">
                      <span class="pro-price color-E30019 fs-2">${ customPriceElm }₫</span>
                      <del class="pro-discount text-6D6E72 fs-18px fw-400 ms-12px">${ customPriceDiscountElm }₫</del>
                      <span class="pro-percent fs-12px py-3px px-2 color-E30019 border text-nowrap rounded-1 ms-12px">${ onSale }%</span>
                  </div>
                  <div class="product-actions mb-2">
                      <button class="btn-buynow text-white p-10px bg-E30019 rounded-1 border-0 d-flex flex-column align-items-center">
                          <span class="maintext fw-600 fs-18px">MUA NGAY</span>
                          <span class="subtext fw-400 fs-14px mt-3px">Giao tận nơi hoặc nhận tại cửa hàng</span>
                      </button>
                  </div>
                  <div class="product-desc-short">
                      <p>&nbsp;</p>
                      <hr />
                      <p class="text-ff0000 fs-18px fw-400">
                          <strong>ƯU ĐÃI KHI MUA KÈM PC</strong>
                      </p>
                      <p class="fs-18px fw-400">
                          ⭐
                          <a href="" class="text-decoration-none">
                              <strong>Ưu đãi lên đến 54% khi mua kèm PC</strong>
                              xem ngay tại đây
                          </a>
                      </p>
                      <p></p>
                      <hr />
                      <p class="fs-18px fw-400 text-ff0000">
                          <strong>Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON.</strong>
                      </p>
                      <p class="fs-15px fw-400" style="letter-spacing: -0.8px;">
                          <em>(Hình ảnh PC chỉ mang tính chất minh họa).</em>
                      </p>
                  </div>
                  <div class="product-discount-promo-box mt-3 rounded-1 border">
                      <div class="box-header bg-CFCFCF py-12px px-20px">
                          <h2 class="fs-18px fw-600 mb-0">Khuyến mãi</h2>
                      </div>
                      <div class="box-content py-6px">
                          <ul class="ps-0 mb-0">
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                              <li class="list-group py-6px px-4 align-items-center flex-row">
                                  <span class="fs-14px fw-400 position-relative">
                                      <span class="ms-28px box-text">Giảm ngay 300.000đ khi mua thêm RAM kèm với PC.</span>
                                      <div class="dropdown-iconCheck position-absolute">
                                          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="8" fill="#1E9800"/><path d="M5 7.86842L7.4 10.5L11 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                      </div>
                                  </span>
                                  <a href="" class="text-decoration-none text-1982F9 fs-14px fw-400">(Xem thêm)</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
`;
} else {
  productDetails.innerHTML = "<p>Sản phẩm không tồn tại</p>";
}
export default $;
