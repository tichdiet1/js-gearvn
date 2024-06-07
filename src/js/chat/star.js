import { pageMain , $, $$, $$$ } from '../../store/index.js';
// --------------sau khi kết thúc cuộc trò truyện thì hiện lên đánh giá-----------------
// .evaluate-chat__star phải có css flex-direction: row-reverse; thì khi hover mới chạy theo chiều từ trái sang phải
// const stars = $$(".evaluate-star");
const defaultRatingIndex = 0;
let currentRatingIndex = 0;
let isActive = true;
// tk này dùng để check xem đã click chưa để kích hoạt sự kiện mouseover gọi ra ratings, nếu chưa click thì chỉ có hover cho có chứ chưa đánh giá
let isClicked = false;
const ratings = [
    { emoji: "✨", name: "Thất vọng" },
    { emoji: "😔", name: "Tệ" },
    { emoji: "🙁", name: "Bình thường" },
    { emoji: "🙂", name: "Vui" },
    { emoji: "🤩", name: "Tuyệt vời" },
];
const reversedRatings = ratings.reverse();
const checkSelectedStar = (star) => {
    if (parseInt(star.getAttribute("data-rate")) === currentRatingIndex) {
        return true;
    } else {
        return false;
    }
};
const setRating = (index) => {
    $$(".evaluate-star").forEach((star) => star.classList.remove("selected"));
    // console.log(index); // mỗi lần mouseout ra ngoài phần tử thì sẽ nhận index = 0 nên phải đặt điều kiện if ở đây
    if (index > 0 && index <= $$(".evaluate-star").length) {
        // console.log(index, index > 0);
        document.querySelector('[data-rate="' + index + '"]').classList.add("selected");
        // console.log(document.querySelector('[data-rate="2"]')); // nhận 1 thẻ element tương đương với data-rate="index";
    }
};
// phần để reset lại toàn bộ ngôi sao
const resetRating = () => {
    currentRatingIndex = defaultRatingIndex;
    setRating(defaultRatingIndex);
};
$$(".evaluate-star").forEach((star, indexElm) => {
    star.addEventListener("click", function () {
        isClicked = true;
        // checkSelectedStar(star) nếu mà bằng 0 thì sẽ xóa selected
        // if (checkSelectedStar(star)) {
        //     // dùng cờ để check xem nếu đúng thì thêm selected nếu sai thì không thêm nữa
        //     if(isActive) {
        //         // resetRating();
        //     }
        //     isActive = false;
        //     return;
        // }
        const index = parseInt(star.getAttribute("data-rate"));
        currentRatingIndex = index;
        setRating(index);

        $$(".evaluate-star").forEach(items => {
            items.classList.remove('active');
        })
        $$(".evaluate-star")[indexElm].classList.add('active');
        // click vào thì hiện emoji đánh giá
        $('.ratings-name').innerText = reversedRatings[indexElm].name;
    });

    star.addEventListener("mouseover", function () {
        const index = parseInt(star.getAttribute("data-rate"));
        setRating(index);
        if(isClicked) {
            // click vào thì hiện emoji đánh giá
            $('.ratings-name').innerText = reversedRatings[indexElm].name;
        }
        $$(".evaluate-star").forEach(items => {
            items.classList.remove('active');
        })
    });

    star.addEventListener("mouseout", function () {
        setRating(currentRatingIndex);
    });
    document.addEventListener("DOMContentLoaded", function () {
        setRating(defaultRatingIndex);
    });
});

function hideEvaluateChat() {
    $('.evaluate-chat').classList.remove('active');
}
// click vào hủy bỏ hover-sendAndSkip
// click vào bỏ qua thì sẽ xóa active để hiện lên phần gửi tin nhắn
$('.hover-sendAndSkip').addEventListener('click', hideEvaluateChat);
$('.evaluate-chat__skip').addEventListener('click', hideEvaluateChat);
// ---------------kết thúc----------------

// ---------------sau khi nhân viên nhận tin nhắn thì sẽ hiện lên icon-like, khúc này làm ngôi sao đánh giá----------------

// ---------------kết thúc----------------
export default ratings;