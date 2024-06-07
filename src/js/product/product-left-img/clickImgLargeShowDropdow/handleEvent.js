import { $, $$ } from '../../../../store/index.js';

import { handleCommonPart } from '../clickImgLargeShowDropdow/sliderImg.js';

import { disableScroll, enableScroll } from '../../../disableScrollDropdown/index.js';

// click vào image thì show ra dropdown image tương ứng
$$('.product-gallery--item').forEach(items => {
    items.onclick = function() {
        $('.fancybox-slider-wrap').classList.add('active');
        $('.fancybox-coating-click').classList.add('hide');
        $('.fancybox-container').classList.add('hide');
        
        if($('.fancybox-coating').classList.contains('hide')) {
            disableScroll();
            console.log('aaa');
        } else {
            // khúc này phải click lại chính nó thì mới trả về bbb, nhưng ở đây chỉ click 1 chiều nên không có
            console.log('bbb');
        }
    }
})




// hover thì hiện toàn bộ showDropdow arrow click pause... phần này chưa hoàn thiện phần không di chuyển chuột
$('.fancybox-container-hover').addEventListener('mouseover', function() {
    $('.fancybox-heading').classList.add('active');
    $('.fancybox-btn').classList.add('active');
})



// ngăn chặn phần tử con nổi bọt, nếu mà để nổi bọt thì sẽ dính sự kiện wheel, wheel sẽ làm cho tất cả thẻ con bị nổi bọt lên hết
$('.fancybox-thumbs').addEventListener('wheel', function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
})

// click vào icon-search thì phóng to và phóng nhỏ hình ảnh
$('.toolbar-search').addEventListener('click', function() {
    $('.fancybox-slider').classList.toggle('zoom-in');
})
   
// click vào pause and start
let active = 0;
// pause
$('.toolbar-Start-slideshow').addEventListener('click', function() {
    // click vào pause thì phải đổi class tương ứng
    if($('.toolbar-Start-slideshow').classList.contains('fancybox-button--play')) {
        $('.toolbar-Start-slideshow').classList.replace('fancybox-button--play', 'fancybox-button--pause');

        startProgressBar();
    } else {
        HandleclearSetInterValProgressBar();
    }
})

// click vào pause thì xuất ra thanh tịnh tiến
let width = 0;
let clearSetInterValProgressBar;
let restartSlider = false;
function startProgressBar() {
    width = 0;
    clearSetInterValProgressBar = setInterval(() => {
        // ví dụ length là 4 thì khi chạy tới length 3 là sẽ ngưng progressBar
        if (active >= $$('.fancybox-image').length - 1) {
            HandleclearSetInterValProgressBar();
            // khi đã chạy đến hình ảnh cuối cùng mà người dùng vẫn muốn click để kích hoạt lại slider chạy lại từ đầu
            if(active >= $$('.fancybox-image').length - 1) {
                restartSlider = true; // Đặt biến restartSlider thành true
            }
        } else if (width >= 100) {
            resetWidthAndUpdateDisplay();
            handleNext();
        } else {
            width++;
            $('.fancybox-progress-bar').style.width = width + '%';
            $('.fancybox-progress-bar').style.display = 'block';
        }
    }, 40);
    // if phải ngang cấp thì mới click được sau khi chạy tới hình cuối cùng
    // khi đã chạy đến hình ảnh cuối cùng mà người dùng vẫn muốn click để kích hoạt lại slider chạy lại từ đầu
    if (restartSlider) {
        // nếu để active ở đây thì sẽ lỗi ngay
        // active = 0
        handleCommonPart(active);
    }
}
function handleNext() {
    // check khi thanh bar chạy tới width = 100 thì mới chuyển image
    if(active == $$('.fancybox-image').length - 1) {
        active = $$('.fancybox-image').length - 1;
    } else {
        active++;
    }
    // cập nhật lại giao diện thì slider mới chạy được
    handleCommonPart(active);
}
function handlePrev() {
    if(active == 0) {
        active = 0;
    } else {
        active--;
    }
    // cập nhật lại giao diện thì slider mới chạy được
    handleCommonPart(active);
}
function HandleclearSetInterValProgressBar() {
    resetWidthAndUpdateDisplay();

    // dừng gọi lại hàm setInterval
    clearInterval(clearSetInterValProgressBar);

    // khi đã setInterval tới tấm ảnh cuối cùng thì từ nút start đổi đổi thành pause
    $('.toolbar-Start-slideshow').classList.replace('fancybox-button--pause', 'fancybox-button--play');
}
function resetWidthAndUpdateDisplay() {
    // reset width = 0 để bắt đầu width lại
    width = 0;
    // cập nhật giao diện lại thì width mới có tác dụng
    $('.fancybox-progress-bar').style.width = width + '%';
    $('.fancybox-progress-bar').style.display = 'none';
}

// click vào icon-thumb thì sẽ xuất ra list img
$('.toolbar-Thumbnails-click').addEventListener('click', function() {
    $('.fancybox-thumbs').classList.toggle('active');
    $('.fancybox-toolbar-click').classList.toggle('active');

    $('.fancybox-btn-click-right').classList.toggle('active');
})
// click vào từng hình thì active sẽ đi theo từng elm và thêm border màu đỏ
$$('.fancybox-thumbs__item').forEach((items, index) => {
    items.onclick = function(event) {
        // Xóa lớp active khỏi tất cả các phần tử
        $$('.fancybox-thumbs__item').forEach(items => {
            items.classList.remove('active');
        });
        // Thêm lớp active vào phần tử được click
        $$('.fancybox-thumbs__item')[index].classList.add('active');

        // ngăn chặn reload trang
        event.preventDefault();
    }
})
// click vào nút close
$('.toolbar-Close').addEventListener('click', function() {
    handleResetAll();
})
// click vào lớp coating
$('.fancybox-coating-click').addEventListener('click', function() {
    handleResetAll();
})
// ngăn chặn click của lớp coating
$('.fancybox-slider-wrap').addEventListener('click', (e) => {
    $('.fancybox-slider').classList.toggle('zoom-in');

    HandleclearSetInterValProgressBar();
    hanleStopPropagation(e);
});
$('.fancybox-toolbar-click').addEventListener('click', hanleStopPropagation);
$('.fancybox-thumbs').addEventListener('click', hanleStopPropagation);
function hanleStopPropagation(e) {
    e.stopPropagation();
}
function handleResetAll() {
    $('.fancybox-slider').classList.remove('zoom-in');
    $('.fancybox-thumbs').classList.remove('active');
    $('.fancybox-toolbar-click').classList.remove('active');

    $('.fancybox-coating-click').classList.remove('hide');
    $('.fancybox-container').classList.remove('hide');
    $('.fancybox-slider-wrap').classList.remove('active');

    $('.fancybox-btn-right').classList.remove('active');

    HandleclearSetInterValProgressBar();
    
    enableScroll();
}
export { resetWidthAndUpdateDisplay, handleNext, handlePrev, hanleStopPropagation };
export default $;