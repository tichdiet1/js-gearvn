import { pageMain , $, $$, $$$ } from '../../store/index.js';
$('.show-chat--body').addEventListener('scroll', () => {
    const scrollTop = $('.show-chat--body').scrollTop;
    // lấy chiều cao của phần tử theo thanh scrollHeight, bao gồm cả phần đệm
    const scrollHeight = $('.show-chat--body').scrollHeight;
    // lấy chiều cao của phần tử, bao gồm cả phần đệm
    const clientHeight = $('.show-chat--body').clientHeight;
    const percentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    const scrollEnd = calculateScrollEnd(scrollHeight, clientHeight);
    if(percentage === 0) {
        $('.backtotop-chat').classList.add('active');
    } else {
        $('.backtotop-chat').classList.remove('active');
    }
    $('.backtotop-chat').onclick = function() {;
        $('.show-chat--body').scrollTop = scrollEnd; // click vào thì chạy xuống scroll cuối cùng
        autoMouseOver();
    }
})
function calculateScrollEnd(scrollHeight, clientHeight) {
    const scrollEnd = scrollHeight - clientHeight; // lấy tọa độ ở cuối trang
    return scrollEnd;
}
function autoMouseOver() {
    // chưa hoàn thiện hiệu ứng
    const x = event.clientX;
    const y = event.clientY;
    $('.backtotop-chat').classList.add('hide');
    setTimeout(() => {
        $('.backtotop-chat').classList.remove('hide');
    }, 1000); 
    console.log(x, y);
}
export default calculateScrollEnd;