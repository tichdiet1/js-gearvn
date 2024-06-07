import { $, $$, $$$ } from '../../../store/index.js';

$('.js-click-button-register').addEventListener('click', handleShowModel);
$('.js-btn-register-close').addEventListener('click', clickCloseRemoveShowModel);
$('.js-click-register-coating-show').addEventListener('click', clickCoatingRemoveShowModel);
function handleShowModel() {
    $('.js-click-register-coating-show').classList.add('show');
    $('.js-click-register-conten-show').classList.add('show');
}
function clickCoatingRemoveShowModel(e) {
    if(e.target === e.currentTarget) {
        $('.js-click-register-coating-show').classList.remove('show');
        $('.js-click-register-conten-show').classList.remove('show');
    }
}
function clickCloseRemoveShowModel() {
    $('.js-click-register-coating-show').classList.remove('show');
    $('.js-click-register-conten-show').classList.remove('show');
}
export default $;