import { pageMain , $, $$, $$$ } from '../../store/index.js';
// trang đồng hồ online để xem mấy giờ
// https://onlinealarmkur.com/clock/vi/#digital-clock
let interval;
let hours = 0;
let seconds = 0;
let minutes = 0;

function startTimer() {
  interval = setInterval(function () {
    seconds++;
    // console.log(seconds);
    if (seconds > 59) {
        minutes++;
        // nếu mà không xét lại biến seconds thì nó cứ chạy lên 61 62 63...
        seconds = 0;
    }

    if (minutes > 59) {
        hours++;
        // phút cũng chạy như giây, nếu không reset cũng như vậy
        minutes = 0;
    }

    updateChatTime();
  }, 1000);
}
// hàm xử lý chuỗi trước khi render ra màn hình
function getTimeString() {
    let timeString = '<p class="fs-12px fw-400 mb-0 text-nowrap">Gearvn · ';

    if (hours === 0 && minutes === 0 && seconds < 60) {
        // 0h 0p seconds < 60
        timeString += 'vài giây tới';
        // console.log('vài giây tới a');
    } else if (hours === 0 && minutes >= 1 && seconds === 0) {
        // 0h 1p 0s
        timeString += minutes + ' phút trước';
        // console.log(minutes + ' phút trước b');
    } else {
        if (hours > 0) {
            timeString += hours + ' giờ ';
            // console.log(hours + ' giờ  c');
        }
        // nếu không check thêm hours thì sẽ hiện ra 1h 1p trước
        if (minutes > 0 && hours === 0) {
            timeString += minutes + ' phút ';
            // console.log(minutes + ' phút d');
        }
        timeString += 'trước.';
        // console.log('trước f');
    }

    timeString += '</p>';

    return timeString;
}
function updateChatTime() {
    let div = $('.box-chat__hour');
    div.innerHTML = getTimeString();
}

// từ đây trở về sau là liên quan tới click
// lưu ý: handleTime() phần này được gọi nên mới có let div = $('.box-chat__hour');
function handleTime() {
    clearInterval(interval);
    resetTime();
    startTimer();
    
    // ban đầu gọi thì hoàn toàn là không có hàm $('.box-chat__hour') nên nó bỏ qua chạy qua appendChild(div).
    // nếu không có hàm này thì khi click nó sẽ không thể tính toán được thời gian.
    let chatHourDiv = $('.box-chat__hour');
    if (chatHourDiv) {
      chatHourDiv.remove();
    }
  
    let div = document.createElement('div');
    div.setAttribute('class', 'box-chat__hour ps-60px pt-3');
    div.innerHTML = 'Gearvn · vài giây tới';
    $('.box-chat').appendChild(div);

    updateChatTime();
}
function clearChatHours() {
    // buộc phải để như vầy thì mới gán được, nếu cầm trực tiếp tất cả code sau dấu bằng tung xuống gán lại thì lỗi ngay.
    // phần reset và gán thời gian xuống cuối cùng tin nhắn.
    let lastBoxChatHourElement = $$('.box-chat__hour')[$$('.box-chat__hour').length - 1]
    lastBoxChatHourElement = handleTime();

}
function resetTime() {
    // nếu muốn giây chạy nhanh hơn thì để 55s là xong 
  seconds = 0;
  minutes = 0;
  hours = 0;
}
export { clearChatHours, handleTime };
export default hours;