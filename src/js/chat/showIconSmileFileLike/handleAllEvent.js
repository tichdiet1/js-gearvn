import { pageMain, $, $$ } from "../../../store/index.js";

import { readUrl, renderImgFile } from '../readFile.js';
// xử lý phần onclick vào icon-like thì hiện ra phần đánh giá chat
$('.icon-like__wrap').addEventListener('click', function(e) {
    $('.icon-like__wrap').classList.toggle('active');
    if($('.icon-like__wrap').classList.contains('active')) {
        $('.icon-like__wrap').classList.remove('hover-like');
        $('.icon-like').classList.remove('hover-rounded-circle');
        $('.icon-like').classList.add('active');
        setTimeout(() => {
            $('.icon-like').classList.remove('active');
        }, 400);
    } else {
        $('.icon-like__wrap').classList.add('hover-like');
        $('.icon-like').classList.add('hover-rounded-circle');
    }
    e.stopPropagation();
})

// xử lý phần onclick vào icon-file
const inputFile = document.getElementById('send-file');
let arrImgFile = [];
$('.icon-file').addEventListener('click', function() {
    handleIconClick($('.icon-file'), $('.icon-file-wrap'));
    inputFile.click();
})
inputFile.onchange = function() {
    readUrl(inputFile, arrImgFile);
};

// click vào icon smile thì show lên dropdown icons
$('.icon-smile').addEventListener('click', function(e) {
    $('.icon-smile__group').classList.toggle('active');
    handleIconClick($('.icon-smile'), $('.icon-smile__wrap'));
    // ngăn chặn được mỗi phần tử $('.icon-smile') thôi
    e.stopPropagation();
})
function handleIconClick(icon, wrap) {
    wrap.classList.toggle('active');
    if (wrap.classList.contains('active')) {
        icon.classList.remove('hover-rounded-circle');
        icon.classList.add('active');
        setTimeout(() => {
            icon.classList.remove('active');
        }, 400);
    } else {
        icon.classList.add('hover-rounded-circle');
    }
    // reset icon-bars
    $('.icon-bars').classList.remove('active');
}
/**
 * $('.show-chat') là phần tử cha, $('.icon-smile') là phần tử con, muốn phần tử con k dính sự kiện nổi bọt thì dùng e.stopPropagation();
 * nhưng mà $('.icon-smile') nếu chỉ dùng mỗi e.stopPropagation(); thì chỉ click vào phần tử $('.icon-smile') sau đó thêm active
 * được thôi. Còn khi click vào phần được dropdown $('.icon-smile__group') thì sẽ mất nên mới sinh ra dòng 
 *  $('.icon-smile__group').addEventListener('click', function(e) {
        e.stopPropagation();
    })
 */
// phần này dùng để ngăn chặn nổi bọt khi click vào phần tử dropdown
$('.dropdown-icon-bars').addEventListener('click', handleStopPropagation)
$('.icon-smile__group').addEventListener('click', handleStopPropagation)
function handleStopPropagation(e) {
    e.stopPropagation();
}
export default $