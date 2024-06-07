// lúc này file nào cần dùng thì import là xong
// kiểm tra xem có link hình hay không, nếu có thì d-block, nếu chuỗi rỗng thì d-none
function sticker(stickeyElm) {
    const stickerElm = stickeyElm !== '' ? 'd-block' : 'd-none';
    return stickerElm;
}
function svgInstallment(Installment) {
    const installmentElm = Installment !== '' ? 
    `
        ${ Installment }
    ` :
    `<span class="tag-gifthot"></span>`;
    return installmentElm;
}
function svggiftHot(giftHot) {
    const giftHotElm = giftHot !== '' ? 
    `
        ${ giftHot }
    ` :
    `<span class="tag-gifthot"></span>`;
    return giftHotElm;
}
function svgGift(svgGift) {
    const GiftElm = svgGift !== '' ? 
    `
        ${ svgGift }
    ` :
    ``;
    return GiftElm;
}
function preOrder(preOrder) {
    const preOrderElm = preOrder !== '' ? 
    `
        ${ preOrder }
    ` :
    `
        <span class="tag-preOrder"></span>
    `;
    return preOrderElm;
}
function progress(progress, svgFire) {
    let progressElm = progress;
    if(progressElm === '') {
        progressElm = `
            <span class="proloop-label--bestseller d-inline-flex align-items-center py-2px pe-3 ps-6px">
                <span class="text-nowrap fs-12px fw-600 text-white ms-1"></span>
            </span>
        `;
    } else if(progressElm === 'Sản phẩm mới') {
        progressElm = `
            <span class="proloop-label--bestseller d-inline-flex align-items-center bg-24B400 rounded-4 py-2px pe-3 ps-6px">
                <span class="text-nowrap fs-12px fw-600 text-white ms-1">Sản phẩm mới</span>
            </span>
        `;
    } else {
        progressElm = `
            <span class="proloop-label--bestseller d-inline-flex align-items-center bg-E30019 rounded-4 py-2px pe-3 ps-6px">
            ${ svgFire }
                <span class="text-nowrap fs-12px fw-600 text-white ms-1">Bán chạy</span>
            </span>
        `;
    }
    return progressElm;
}
// vd: 15.000.000
function customPrice(currentPrice) {
    const format = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return format;
}
// time-Sale
function hanleTimeSale(timePresent, dayElm, hourElm, minuteElm, secondElm) {
    // getTime(): lấy thời gian hiện tại dưới dạng miligiây từ ngày 1 tháng 1 năm 1970 00:00:00 UTC (còn được gọi là Unix timestamp).
    // chuyển thời gian hiện tại về số miligiay
    let previousDay = -1; // Ngày trước đó
    let previousHour = -1; // Giờ trước đó
    let previousMinute = -1; // Phút trước đó
    let previousSecond = -1; // Giây trước đó
    let isFinished = false; // Cờ đánh dấu đã kết thúc
    let check = setInterval(function(){
        let now = new Date().getTime();
        let distance = timePresent - now;
        let day = Math.floor(distance / (24*60*60*1000));
        let hour = Math.floor((distance % (24*60*60*1000)) / (60* 60*1000));
        let minute = Math.floor((distance % (60* 60*1000)) / (60*1000));
        let seconds = Math.floor((distance % (60*1000)) / 1000);

        // custom số 0 cho hour
        let hourString = hour.toString().padStart(2, '0');
        let minuteString = minute.toString().padStart(2, '0');
        let secondString = seconds.toString().padStart(2, '0');

        // làm hiệu ứng day
        let dayElement = dayElm;
        if(day !== previousDay && hour === 23 && minute === 59 && seconds === 59) {
            // if(day !== previousDay) {
                dayElement.classList.add('highlight');
            // }
            setTimeout(() => {
                dayElement.classList.remove('highlight');
            }, 500);
        }
        dayElement.innerText = day;
        // làm hiệu ứng hour
        let hourElement = hourElm;
        if(hour !== previousHour && minute === 59 && seconds === 59) {
            // if(hour !== previousHour) {
                hourElement.classList.add('highlight');
            // }
            setTimeout(() => {
                hourElement.classList.remove('highlight');
            }, 500);
        }
        hourElement.innerText = hourString;

        // // làm hiệu ứng minute
        let minuteElement = minuteElm;
        // seconds chỉ chạy từ 59 - 0 chứ không có chạy ra - 1
        // nếu seconds === 59 có nghĩa là giây đã chạy được 1 vòng thì sẽ gán hiệu ứng cho phút
        if (minute !== previousMinute && seconds === 59) {
            // phút chỉ chạy từ 59 - 0, nên khúc này mãi mãi khác trừ 1
        //   if (minute !== previousMinute) {
            // thêm active để làm hiệu ứng phút khi giây đã chạy được 1 vòng
            minuteElement.classList.add('highlight');
            // Sau 500 mili giây thì sẽ xóa highlight, tại vì đã thêm highlight thì nó sẽ giữ nguyên class, nên phải sau 500 miligiay thì phải xóa class
            setTimeout(() => {
            minuteElement.classList.remove('highlight');
            }, 500);
        //   }
        }
        // trạng thái mặc định buộc phải hiện khi chạy web
        minuteElement.innerText = minuteString;
        // làm hiệu ứng second
        let secondElement = secondElm;
        // seconds !== previousSecond: seconds luôn luôn khác trừ 1
        if (seconds !== previousSecond) {
        secondElement.classList.add('highlight');
        // y trang tk phút
        setTimeout(() => {
            secondElement.classList.remove('highlight');
        }, 500);
        }
        // trạng thái mặc định khi web chạy
        secondElement.innerText = secondString;

        // nếu bỏ hàm if ở trên thì sẽ không nhận được giá trị 
        // hàm này phụ trách khi thời gian nhỏ hơn 0 thì reset lại toàn bộ = 0 nếu không reset lại thì sẽ ra thời gian -1d -1h -1p -45s
        if (distance <= 0) {
            dayElement.innerHTML = '0';
            hourElement.innerHTML = '00';
            minuteElement.innerHTML = '00';
            secondElement.innerHTML = '00';
            isFinished = true;
            clearInterval(check);
        }
    }, 1000);
    return check
// begin ms
// 1s = 1000 ms
// 1p = 60s = 60*1000 ms
// 1h = 60p = 60*60 s = 60* 60* 1000 ms
// 1d = 24h = 24*60p = 24*60*60s = 24*60*60*1000 ms 
}
// chỉ được import tên không được gọi hàm
export default { sticker, customPrice, hanleTimeSale, svggiftHot, svgGift, preOrder, progress, svgInstallment };