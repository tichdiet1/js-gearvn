import { $, $$ } from '../../../store/index.js'
import { borderImgSmall } from '../product-left-img/sliderImagesSmall.js';

let active = 0;
// thiệt ra ở đây không cần truyền tham số vào handleSlider, lý do truyền là để kết nối với file sliderImagesSmall
export function handleSlider(active) {
    let width = $('.product-gallery--item').offsetWidth;
    $('.transform-product-handleEvent').style.transform = `translateX(${-width * active}px)`;
    $('.transform-product-handleEvent').style.transitionDuration = '1000ms';
    setTimeout(() => {
        $('.transform-product-handleEvent').style.transitionDuration = '0ms';
    }, 1000)

    $('.btn-button-handleEvent button:last-child').classList.toggle('active', active === $$('.product-gallery--item').length - 1);
    $('.btn-button-handleEvent button:first-child').classList.toggle('active', active === 0);
}
handleSlider(active);
// next
$('.btn-button-handleEvent button:last-child').addEventListener('click', function() {
    // undefined là biến không xác định và chưa được khởi tạo nên nó phù hợp với hiện tại
    active != $$('.product-gallery--item').length - 1 ? active++ : undefined;
    // if(active != $$('.product-gallery--item').length - 1) {
    //     active++
    // } else {
    //     // khi chạy tới hình cuối cùng thì trả về null sau đó nó sẽ quay về hình đầu tiên
    //     // null: biến đã được khởi tạo nhưng không có giá trị nên nó chạy slider quay về hình ảnh đầu tiên còn undefined thì không
    //     active = null
    // }
    // mỗi lần click img-large thì border của img-small nó sẽ chạy theo tương ứng
    borderImgSmall($$('.product-thumb'), active);

    handleSlider(active);
})
// prev
$('.btn-button-handleEvent button:first-child').addEventListener('click', function() {
    active != 0 ? active-- : undefined;

    borderImgSmall($$('.product-thumb'), active);

    handleSlider(active);
})

// click vào imgs-large thì show ảnh tương ứng đồng thời hiện dropdown

export default $;