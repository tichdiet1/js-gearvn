import { pageMain , $, $$, $$$ } from '../../store/index.js';
// handle click vào toàn bộ phần content bao quanh toàn bộ khung chat thì sẽ ẩn toàn bộ icon nào đang show dropdown
$('.show-chat').addEventListener('click', resetClassChat);
export function resetClassChat() {
    $('.icon-smile__wrap').classList.remove('active');
    $('.icon-like__wrap').classList.remove('active');
    $('.icon-bars').classList.remove('active', 'user-chat');
}
$('.dropdown-userName-coating').addEventListener('click', function(e) {
    if(e.target == e.currentTarget) {
        $('.dropdown-userName-coating').classList.remove('active');
        $('.dropdown-userName').classList.remove('active');
    }
})
export default $('.show-chat');