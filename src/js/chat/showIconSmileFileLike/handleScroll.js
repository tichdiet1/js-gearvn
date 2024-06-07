import { pageMain, $, $$ } from "../../../store/index.js";
import { arrShowIcon } from '../../../store/state.js';
import searchIconCpn from './searchIcon.js';
import { render } from './searchIcon.js';
let currentIndex = 0;
// làm border bottom khi click vào từng icon-group icon
$$('.emoji-mart-anchor-icon').forEach((icons, index) => {
    icons.addEventListener('click', function() {
        $$('.emoji-mart-anchor-icon').forEach(items => {
            items.classList.remove('active');
        })
        $$('.emoji-mart-anchor-icon')[index].classList.add('active');

        currentIndex = index;
        addClass('', currentIndex);
        if(currentIndex == 0) {
            $('.icon-smile__body').scrollTop = 0
        } else if(currentIndex == 1) {
            $('.icon-smile__body').scrollTop = 136
        } else if(currentIndex == 2) {
            $('.icon-smile__body').scrollTop = 2544
        } else if(currentIndex == 3) {
            $('.icon-smile__body').scrollTop = 3265
        } else if(currentIndex == 4) {
            $('.icon-smile__body').scrollTop = 3946
        } else if(currentIndex == 5) {
            $('.icon-smile__body').scrollTop = 4412
        } else if(currentIndex == 6) {
            $('.icon-smile__body').scrollTop = 5527
        } else if(currentIndex == 7) {
            $('.icon-smile__body').scrollTop = 6784
        } else if(currentIndex == 8) {
            $('.icon-smile__body').scrollTop = 7899
        }
    })
});
// làm phần kéo scroll xuống thì hiện lên title tương ứng
function handleScroll() {
    $('.icon-smile__body').addEventListener('scroll', function() {
        let scroll  = this.scrollTop;
        checkScroll(scroll);
    });
}
handleScroll();
function checkScroll(scroll) {
    if(scroll >= 36 && scroll < 136) {
        // console.log(`Frequently Used`);
        currentIndex = 0;
        addClass('Frequently Used' ,currentIndex);
    } else if(scroll >= 136 && scroll < 2544) {
        // console.log(`Smileys & People`);
        currentIndex = 1;
        addClass('Smileys & People' ,currentIndex);
    } else if(scroll >= 2544 && scroll < 3265) {
        // console.log(`Animals & Nature`);
        currentIndex = 2;
        addClass('Animals & Nature' ,currentIndex);
    } else if(scroll >= 3265 && scroll < 3946) {
        // console.log(`Food & Drink`);
        currentIndex = 3;
        addClass('Food & Drink' ,currentIndex);
    } else if(scroll >= 3946 && scroll < 4412) {
        // console.log(`Activity`);
        currentIndex = 4;
        addClass('Activity' ,currentIndex);
    } else if(scroll >= 4412 && scroll < 5527) {
        // console.log(`Travel & Places`);
        currentIndex = 5;
        addClass('Travel & Places' ,currentIndex);
    } else if(scroll >= 5527 && scroll < 6784) {
        // console.log(`Objects`);
        currentIndex = 6;
        addClass('Objects' ,currentIndex);
    } else if(scroll >= 6784 && scroll < 7899) {
        // console.log(`Symbols`);
        currentIndex = 7;
        addClass('Symbols' ,currentIndex);
    } else if(scroll >= 7899) {
        // console.log(`flag`);
        currentIndex = 8;
        addClass('flag' ,currentIndex);
    }
}
function addClass(items, currentIndex) {
    // lỗi không dùng if else fix lỗi 30p
    if($('.smile__body-input').value == '') {
        $$('.smile__body-category').forEach(items => {
            items.classList.remove('scroll');
        });
        $$('.smile__body-category')[currentIndex].classList.add('scroll');
    } else {
        render(arrShowIcon);
        // phải check để không bị lỗi scroll
        $$('.emoji-mart-anchor-icon').forEach((icons, index) => {
            icons.addEventListener('click', function() {
                $$('.emoji-mart-anchor-icon').forEach(items => {
                    items.classList.remove('active');
                })
                $$('.emoji-mart-anchor-icon')[index].classList.add('active');
        
                currentIndex = index;
                addClass('', currentIndex);
                if(currentIndex == 0) {
                    $('.icon-smile__body').scrollTop = 0
                } else if(currentIndex == 1) {
                    $('.icon-smile__body').scrollTop = 136
                } else if(currentIndex == 2) {
                    $('.icon-smile__body').scrollTop = 2544
                } else if(currentIndex == 3) {
                    $('.icon-smile__body').scrollTop = 3265
                } else if(currentIndex == 4) {
                    $('.icon-smile__body').scrollTop = 3946
                } else if(currentIndex == 5) {
                    $('.icon-smile__body').scrollTop = 4412
                } else if(currentIndex == 6) {
                    $('.icon-smile__body').scrollTop = 5527
                } else if(currentIndex == 7) {
                    $('.icon-smile__body').scrollTop = 6784
                } else if(currentIndex == 8) {
                    $('.icon-smile__body').scrollTop = 7899
                }
            })
        });
    }
}
export default $;