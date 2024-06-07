import { pageMain, $, $$, $$$ } from '../../store/index.js';

$('body').addEventListener('click', function(e) {
    $('.dropdown-search').classList.add('d-none');
})
$('.item-banner').addEventListener('click', stopPropage);
$('.container').addEventListener('click', stopPropage);
$('.sticky-advertisement').addEventListener('click', stopPropage);
$('.chat').addEventListener('click', stopPropage);
// $('.footer').addEventListener('click', stopPropage);
function stopPropage(e) {
    e.stopPropagation();
}
export default $;