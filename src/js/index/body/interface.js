import { $, $$, $$$ } from '../../../store/index.js';

let nodeWraper = document.createElement('div');
nodeWraper.setAttribute('id', 'wrapper');
$('body').appendChild(nodeWraper);

let nodeMain = document.createElement('main');
$$$('wrapper').appendChild(nodeMain);

export default $;