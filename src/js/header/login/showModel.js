import { $, $$, $$$ } from '../../../store/index.js';

$('.js-eye-click').addEventListener('click', function() {
    this.classList.toggle('show');
    const getAttributeInput = $$$('login-password').getAttribute('type');
    if(this.classList.contains('show')) {
        // cách 1
        $$$('login-password').setAttribute('type', getAttributeInput === 'text' ? 'password' : 'text');
        // cách 2
        // $$$('login-password').setAttribute('type', getAttributeInput === 'password' ? 'text' : 'password');
    } else {
        // setAttribute(kiểu dữ liệu, truyền vào chuỗi string)
        $$$('login-password').setAttribute('type', getAttributeInput === 'password' ? 'text' : 'password');
    }
})

$('.js-click-button-login').addEventListener('click', handleShowModel);
$('.js-btn-login-close').addEventListener('click', clickCloseRemoveShowModel);
$('.js-click-login-coating-show').addEventListener('click', clickCoatingRemoveShowModel);
function handleShowModel() {
    $('.js-click-login-coating-show').classList.add('show');
    $('.js-click-login-conten-show').classList.add('show');
}
function clickCoatingRemoveShowModel(e) {
    if(e.target === e.currentTarget) {
        $('.js-click-login-coating-show').classList.remove('show');
        $('.js-click-login-conten-show').classList.remove('show');
    }
}
function clickCloseRemoveShowModel() {
    $('.js-click-login-coating-show').classList.remove('show');
    $('.js-click-login-conten-show').classList.remove('show');
}

export default $;