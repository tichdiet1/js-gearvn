import { pageMain, $, $$, $$$ } from '../../../store/index.js';
const arrAdvertisement = pageMain.arrAdvertisement;
const mapAdvertisement = arrAdvertisement.map(item => `
    <div class="col-lg-6 px-2">
        <img alt="" class="w-100 card-img-top card-img-bottom"
        lazy-src="${ item.mainImg }"/>
    </div>
`).join('');  
let resultAdvertisement = `
    <div class="container mb-3">
        <div class="row">
            ${ mapAdvertisement }
        </div>
    </div>
`;
// phần 2 tâm ảnh quảng cáo ở phần body
let section = document.createElement('section');
section.setAttribute('class', 'section-advertisement');
section.innerHTML = resultAdvertisement;
const main = $('main');
main.insertBefore(section, main.children[4]);
export default pageMain