import { pageMain, $, $$, $$$ } from '../../../../store/index.js';
import getters from '../../../../store/getters.js';
import { resultStringLoop } from '../sale/interface.js';

let main = document.querySelector('main');
const section = document.createElement('section');
section.setAttribute('class', 'section-saleProduct');
section.innerHTML = resultStringLoop[1];
main.appendChild(section);

let presentTimeMonopoly = new Date("04/28/2024 24:00:00").getTime();
getters.hanleTimeSale(presentTimeMonopoly, $$('.saleProduct-day')[1], $$('.saleProduct-hour')[1], $$('.saleProduct-minute')[1], $$('.saleProduct-second')[1]);
export default pageMain;