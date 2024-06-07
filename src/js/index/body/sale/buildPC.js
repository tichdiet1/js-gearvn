import { pageMain, $, $$, $$$ } from '../../../../store/index.js';
import getters from '../../../../store/getters.js';
import { resultStringLoop } from '../sale/interface.js';

let main = document.querySelector('main');
const section = document.createElement('section');
section.setAttribute('class', 'section-saleProduct');
section.innerHTML = resultStringLoop[0];
main.appendChild(section);

let presentTimeBuildPc = new Date("04/29/2024 24:00:00").getTime();
getters.hanleTimeSale(presentTimeBuildPc, $$('.saleProduct-day')[0], $$('.saleProduct-hour')[0], $$('.saleProduct-minute')[0], $$('.saleProduct-second')[0]);
export default pageMain;