import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrSlider = pageMain.arrSlider;
let divElements = '';
arrSlider.map(item => {
    let iconGroup = ''; // phạm vi ngang cấp sài chung cho toàn bộ
    let carousel = ''; // phạm vi ngang cấp sài chung cho toàn bộ
    let dots = ''; // phạm vi ngang cấp sài chung cho toàn bộ
    let figcaptionImage = ''; // phạm vi ngang cấp sài chung cho toàn bộ
    for(let key in item) {
        if(key === 'iconArrow' && item.hasOwnProperty(key)) {
            const obj = item[key];
            obj.map(obj => {
                iconGroup += `
                    <span class="position-absolute top-50 translate-middle-y z-index103 cursor-pointer rounded-circle text-white fw-100">
                        ${ obj.icon }
                    </span>
                `;
            })
        }
        if(key === 'imageElm' && item.hasOwnProperty(key)) {
            const obj = item[key];
            obj.map((obj, index) => {
                let { image } = obj;
                carousel += `
                    <div class="item-banner-carousel d-none w-100 h-100">
                        <img src="${ image }" alt="Mừng xuân giáp thìn" class="w-100 h-100">
                    </div>
                `;
            })
        }
        if(key === 'dot' && item.hasOwnProperty(key)) {
            const obj = item[key];
            obj.map(obj => {
                dots += `
                    <div class="dots-item bg-rgba00003"></div>
                `;
            })
        }
        if(key === 'figcaptionImageSlider' && item.hasOwnProperty(key)) {
            const obj = item[key];
            obj.map(obj => {
                figcaptionImage += `
                    <div class="flex-grow-1 px-1" style="height: 161px;">
                        <img src="${ obj.image }" class="w-100 h-100" alt="">
                    </div>
                `;
            })
        }
    }
    let carouselGroup = '';
    carouselGroup += `
        <div class="carousel position-relative w-100 flex-grow-1 overflow-hidden">
            <div class="btns">
                ${ iconGroup }
            </div>
            <div class="carousel-imgs h-100 d-flex position-relative">
                ${ carousel }
            </div>
            <div class="dots-Group position-absolute start-50 translate-middle-x">
                <div class="dots-carousel d-flex justify-content-between cursor-pointer">
                ${ dots }
                </div>
            </div>
        </div>
        <picture class="d-flex justify-content-between mt-2">
            ${ figcaptionImage }
        </picture>
    `;
    // nếu dùng innerHTML ở đây thì hoàn toàn bị lỗi, tại vì chưa khởi tạo bên ngoài dom
    divElements += carouselGroup;
}).join('');
$('.carousel-group').innerHTML = divElements;

// handleSlider
let currentIndex = 0;
let clearsetIntervalElm = setInterval(() => {
    currentIndex = currentIndex == $$('.item-banner-carousel').length - 1 ? currentIndex = 0 : currentIndex + 1;
    sliderMain();
}, 3000);
// hàm dùng để render ra màn hình đồng thời cũng là hàm gộp chung mọi thứ sài chung lại với nhau
function sliderMain() {
    $$('.item-banner-carousel').forEach(img => {
        img.classList.remove('d-block');
    });

    $$('.dots-item').forEach(active => {
        active.classList.remove('active');
    });

    $$('.item-banner-carousel')[currentIndex].classList.add('d-block');

    $$('.item-banner-carousel').forEach(img => {
        if(img.classList.contains('d-block')) {
            img.classList.remove('d-none');
        } else {
            img.classList.add('d-none');
        }
    });

    $$('.dots-item')[currentIndex].classList.add('active');

    clearInterval(clearsetIntervalElm);
    clearsetIntervalElm = setInterval(()=> {
        currentIndex = currentIndex == $$('.item-banner-carousel').length - 1 ? currentIndex = 0 : currentIndex + 1;
        sliderMain();
    }, 3000);
}
$$('.btns span').forEach((item, index) => {
    item.onclick = function() {
        if(index == 0) {
            currentIndex = currentIndex == 0 ? $$('.item-banner-carousel').length - 1 : currentIndex - 1;
            sliderMain();
        }
        if(index == 1) {
            currentIndex = currentIndex == $$('.item-banner-carousel').length - 1 ? currentIndex = 0 : currentIndex + 1;
            sliderMain();
        }
    }
});
sliderMain();
// click vào từng dots thì slider sẽ chạy theo
$$('.dots-item').forEach((item, index) => {
    item.onclick = function() {
        currentIndex = index;
        sliderMain();
    }
})
export default arrSlider