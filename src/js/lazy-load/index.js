function load(img) {
    const url = img.getAttribute('lazy-src');
    img.setAttribute('src', url);
    img.removeAttribute('lazy-src');
}
function ready() {
    // kiểm tra IntersectionObserver có trong window hay không
    if('IntersectionObserver' in window) {
        var lazyImgs = document.querySelectorAll('[lazy-src]');

        // lấy API: thiết lập quan sát
        let observer = new IntersectionObserver((entries) => {

            // console.log(entries); // khi không kéo thì isIntersecting bằng false, khi khi kéo gần sát tấm hình thì là true

            entries.forEach(entry => {
                // console.log(entry);
                // console.log(entry.isIntersecting); // trả về true hoặc false
                // entry.isIntersecting if true nếu phần tử được vewport nhìn thấy(giao tiếp), if false nếu phần tử không được vewport nhìn thấy(giao tiếp)
                if(entry.isIntersecting) {
                    load(entry.target);
                    // không quan sát vewport nữa
                    observer.unobserve(entry.target);
                }
            })
        });

        lazyImgs.forEach(img => {
            // console.log(img);

            // tiến hành quan sát
            observer.observe(img);
        })
    } else {

    }
}
document.addEventListener('DOMContentLoaded', ready);

export default load;