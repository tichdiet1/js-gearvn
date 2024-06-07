import { $, $$ } from '../../../store/index.js';
import { handleSlider } from '../product-left-img/sliderImagesLarge.js';
let active = 0;
// prev
$('.btn-small:first-child').onclick = function() {
    const widthItem = $('.product-thumb').offsetWidth;
    $('.product-gallery--thumb').scrollLeft -= widthItem;
}
// next
$('.btn-small:last-child').onclick = function() {
    const widthItem = $('.product-thumb').offsetWidth;
    $('.product-gallery--thumb').scrollLeft += widthItem;
}

// click vào từng hình ảnh thì sẽ có lớp border hiện lê
$$('.product-thumb').forEach((items, index) => {
    items.addEventListener('click', function() {
        borderImgSmall($$('.product-thumb'), index)

        active = index;
        handleSlider(active);
    })
})
export function borderImgSmall(elm, index) {
    for(let i = 0; i < elm.length; i++) {
        elm[i].classList.remove('active');
    }
    elm[index].classList.add('active');
}

export default $