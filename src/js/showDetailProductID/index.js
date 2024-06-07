import { pageMain, $, $$, $$$ } from '../../store/index.js';

$$('.detailProductID').forEach(product => {
    product.addEventListener('click', function() {
        // Lấy ID của sản phẩm từ thuộc tính data-id
        const productId = product.dataset.id;
        // Chuyển hướng đến trang chi tiết sản phẩm cụ thể
        location.href = `/DAJS/src/components/product.html?id=${productId}`;
    })
})

export default $;