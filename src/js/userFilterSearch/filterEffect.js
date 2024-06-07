import { pageMain, $, $$ } from '../../store/index.js';

let div = document.createElement('div');
div.setAttribute('class', 'box-Effect');
div.innerHTML = `
    <div class="loader">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
        <span style="--i:20;"></span>
    </div>
`;
let main = document.querySelector('main');
main.appendChild(div);

document.body.onload = function() {
    $('.userFilterSearch-group').classList.add('active');
    $('.section-userFilterSearch').classList.add('active');
    $('.section-saleProduct').classList.add('active');

    $('.box-Effect').classList.add('active');
    setTimeout(() => {
        $('.box-Effect').classList.remove('active');
    }, 5000)
}
// $('.userFilterSearch-group').classList.add('active');
// $('.section-userFilterSearch').classList.add('active');
// $('.section-saleProduct').classList.add('active');
export default $;