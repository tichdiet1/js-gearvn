import { pageMain , $, $$, $$$ } from '../../store/index.js';
import getters from '../../store/getters.js';
const arrProduct = pageMain.arrProduct;

let isDropdownAppended = false; // Biến cờ để kiểm tra xem dropdown đã được thêm hay chưa
$('.input-search__content').addEventListener('keyup', function(e) {
    $('.dropdown-search').classList.remove('d-none');
    const inputValue = e.target.value;
    checkUserSearch(inputValue, e);
})
function checkUserSearch(inputValue, e) {
    if (inputValue) {
        $('.dropdown-search').classList.add('active');

        const filters = arrProduct.filter(items => {
          return items.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
        });
        if (!filters?.length) {
          notFountProduct();
          removeDropdown();
        } else {
            haveProducts(filters);
            appendDropdown();
            if(e.key === 'Enter') {
                performSearch()
            }
        }
        sessionStorage.setItem('saveSearchProduct', JSON.stringify(filters));
        sessionStorage.setItem('saveUserSearchName', inputValue);
    } else {
        $('.dropdown-search').classList.remove('active');
        
        removeDropdown();
    }
}
function notFountProduct() {
    $('.dropdown-search__Group').classList.add('active');
    $('.dropdown-search__Group').innerHTML = `
        <p class="mb-0 fs-14px fw-400 text-171717 text-center">Không có sản phẩm nào...</p>
    `;
}
function haveProducts(products) {
    $('.dropdown-search__Group').classList.remove('active');
    $('.dropdown-search__Group').innerHTML = '';

    products.forEach(product => {
        let { title, discount, currentPrice, mainImg } = product;
        let customPrice = getters.customPrice(currentPrice);
        let customdiscount = getters.customPrice(discount);
        let div = document.createElement('div');
        div.setAttribute('class', 'rs-searchProduct lh-sm py-12px border-bottom');
        let stringContent = `
            <div class="rs-searchProduct__content d-flex align-items-center justify-content-between">                            
                <div class="rs-searchProduct__left">
                    <div class="rs-searchProduct__title hover-search-title flex-1">
                        <a href="" class=" text-decoration-none fs-13px text-171717 fw-400">${ title }</a>
                    </div>
                    <p class="rs-searchProduct__prices mb-0 lh-sm">
                        <span class="color-E30019 fs-12px fw-500">${ customPrice }đ</span>
                        <del class="text-797979 fs-11px fw-400">${ customdiscount }₫</del>
                    </p>
                </div>
                <div class="rs-searchProduct__right cursor-pointer">
                    <img src="${ mainImg }" alt="${ mainImg }" width="38" height="38" />
                </div>
            </div>
        `;
        div.innerHTML = stringContent;
        $('.dropdown-search__Group').appendChild(div);
    });
}
function appendDropdown() {
    if (!isDropdownAppended) {
      let div = document.createElement('div');
      div.setAttribute('class', 'dropdown-search__seeMore py-1 text-center py-4');
      let stringContent = `
        <a href="#" class="text-decoration-none fs-13px fw-400 text-171717">Xem thêm sản phẩm</a>
      `;
      div.innerHTML = stringContent;
      $('.dropdown-search__content').appendChild(div);
      isDropdownAppended = true; // Đánh dấu rằng dropdown đã được thêm
    }
} 
function removeDropdown() {
    if (isDropdownAppended) {
      const dropdown = document.querySelector('.dropdown-search__seeMore');
      if (dropdown) {
        dropdown.remove();
      }
      isDropdownAppended = false; // Đánh dấu rằng dropdown đã bị xóa
    }
}
function performSearch() {
    window.location.href = '/DAJS/src/components/userFilterSearch.html';
}
$('.input-search__content').addEventListener('click', function(e) {
    $('.dropdown-search').classList.remove('d-none');
    e.stopPropagation();
})
export default $;