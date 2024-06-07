import { pageMain, $, $$ } from "../../../store/index.js";

$('.user-name-input').addEventListener('blur', function(e) {
    checkUser(e);
});
export function checkUser(e) {
    const inputValue = e.target.value;
    // nếu là không có người dùng nhập thì thì if(true)
    if(!inputValue) {
        $('.dropdown-userName__inputGroup').classList.add('error');
        $('.dropdown-userName__inputGroup').classList.remove('success');
        $('.user-name-error').classList.replace('d-none', 'd-block');
    } else {
        $('.dropdown-userName__inputGroup').classList.add('success');
        $('.dropdown-userName__inputGroup').classList.remove('error');
        $('.user-name-error').classList.replace('d-block', 'd-none');
        
        exitIconBar();
        $('.rs-username').innerText = $('.user-name-input').value;

        sessionStorage.setItem('saveChatInput', $('.user-name-input').value);
    }
}
$$('.dropdown-icon-items').forEach(items => {
    items.addEventListener('click', function() {
        this.classList.toggle('active');
    })
})
// $('.dropdown-icon-items').addEventListener('click', function() {
//     this.classList.toggle('active');
// })

$('.icon-bars').addEventListener('click', function(e) {
    if($('.dropdown-icon-bars').classList.contains('d-none')) {
        this.classList.toggle('user-chat');
    } else {
        this.classList.toggle('active');
    }
    // reset $('.icon-smile')
    $('.icon-smile__wrap').classList.remove('active');
    e.stopPropagation();
})
// click vào nút cancel
$('.btn-userName-cancel').addEventListener('click', function() {
    exitIconBar();
})
$('.click-userName-bar').addEventListener('click', function() {
    $('.icon-bars').classList.remove('active');

    $('.dropdown-userName-coating').classList.add('active');
    $('.dropdown-userName').classList.add('active');
    $('.user-name-input').value = $('.rs-username').innerText;
})
$('.btn-userName-save').addEventListener('click', function(e) {
    checkUser(e);
})
function exitIconBar() {
    $('.dropdown-userName-coating').classList.remove('active');
    $('.dropdown-userName').classList.remove('active');
}
// giải quyết vấn đề khi click vào tk userSend thì tk icon-bars lại chạy
$('.dropdown-user-send').addEventListener('click', function(e) {
    e.stopPropagation();
})
export default $;

function reloadPageIndex() {
    // viết như vầy mới chạy được
    // var rsUsername = document.body;
    // rsUsername.onload = function() {
    //     alert('wtf');
    // };
    // nếu dùng sự kiện load thì không thể dùng addEventListener
    // var rsUsername = document.body;
    // rsUsername.addEventListener('load', function() {
    //     alert('wtf');
    // });
}
// reloadPageIndex();