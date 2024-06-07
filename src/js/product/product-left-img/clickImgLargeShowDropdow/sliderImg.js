import { $, $$ } from "../../../../store/index.js";

import { resetWidthAndUpdateDisplay, handleNext, handlePrev, hanleStopPropagation } from '../clickImgLargeShowDropdow/handleEvent.js';

let active = 0;
export function handleCommonPart(active) {
    sliderHiddenAndShowImg(active)

    totalClickImg(active);

    disableBtn(active);

    clickScaleImg(active);
}
handleCommonPart(active);
$(".fancybox-btn-click-left").addEventListener("click", function (e) {
  active > 0 ? active-- : undefined;
  
  handleCommonPart(active);

  // clickScaleImg(active);
  /**
   * Lưu ý: khi đã click vào vào pause thì nó đã thực hiện 1 chức năng riêng biệt
   * cho nên không cập nhật active bên file handleEvent.js thì sẽ bị lỗi.
   * 
   * nút pause với play là làm việc cho file khác và đặc biệt nó làm việc cho active bên file handleEvent.js,
   * còn let active bên đây chỉ làm việc đơn thuần là chuyển slider.
   */
  // khi click vào btn-right thì reset lại progress Bar rồi chạy, nếu đúng là có class pause thì sẽ chạy, chỗ này cũng khiến cho mình phải suy nghĩ
  if($('.toolbar-Start-slideshow').classList.contains('fancybox-button--pause')) {
    // không cập nhật lại giao diện thì khi chạy tới pause thì sẽ bị lỗi active
    resetWidthAndUpdateDisplay();  
    handlePrev();
  }
  // nếu check pause nhưng không check play thì active nó sẽ không thể nào cập nhật được
  if($('.toolbar-Start-slideshow').classList.contains('fancybox-button--play')) {
    resetWidthAndUpdateDisplay();  
    handlePrev();
  }

  // ngăn chặn khi click lớp coating
  hanleStopPropagation(e);
});
$(".fancybox-btn-click-right").addEventListener("click", function (e) {
  active < $$(".fancybox-image").length - 1 ? active++ : undefined;
  handleCommonPart(active);

  // clickScaleImg(active);

  // khi click vào btn-right thì reset lại progress Bar rồi chạy, nếu đúng là có class pause thì sẽ chạy, chỗ này cũng khiến cho mình phải suy nghĩ
  if($('.toolbar-Start-slideshow').classList.contains('fancybox-button--pause')) {
    resetWidthAndUpdateDisplay();
    handleNext();
  }
  if($('.toolbar-Start-slideshow').classList.contains('fancybox-button--play')) {
    resetWidthAndUpdateDisplay();
    handleNext();
  }

  // ngăn chặn khi click lớp coating
  hanleStopPropagation(e);
});
function sliderHiddenAndShowImg(active) {
  $$('.fancybox-image').forEach(items => {
    items.classList.remove('active');
  })
  $$('.fancybox-image')[active].classList.add('active');
}
function clickScaleImg(active) {
  // trường hợp check lỗi này mình cần 30p để fix lỗi k đáng mắc phải
  // console.log(active !== 0 && active !== $$(".fancybox-image").length - 1, active !== 0, active !== $$(".fancybox-image").length - 1);
  // 0 có khác 0 hay k ? không khác
  if (active !== 0 && active !== $$(".fancybox-image").length - 1) {
    // nếu mà chạy tới hình ảnh cuối cùng mà người người bấm zoom rồi lại bấm nút prev hoặc next thì nó vẫn giữ nguyên zoom
    $('.fancybox-slider').classList.remove('zoom-in');
  }
}
function totalClickImg(active) {
  // tính tổng số hình người dùng đã click hình ảnh
  $('.fancybox-infobar span:first-of-type').innerText = active + 1;
}
function disableBtn(active) {
  // cú pháp toán tử 3 ngôi, dùng để làm hiệu ứng vô hiệu hóa nút button
  $(".fancybox-btn-click-left").classList.toggle("disableBtn", active === 0);
  $(".fancybox-btn-click-right").classList.toggle("disableBtn", active === $$(".fancybox-image").length - 1);
}
export default $;
