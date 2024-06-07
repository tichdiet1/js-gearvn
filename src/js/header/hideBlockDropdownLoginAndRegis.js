import { pageMain , $, $$, $$$ } from '../../store/index.js';

const getSaveClassHideRegister = localStorage.getItem('dropdownHideBlockDropdown');
if(getSaveClassHideRegister) {
    const converArr = JSON.parse(getSaveClassHideRegister);
    converArr.forEach(item => {
        if(item.isShown) {
            $('.js-hide-register-errors-dropdown').classList.add(item.classHide); // chưa đăng ký
            $('.js-block-register-errors-dropdown').classList.add(item.classBlock); // đã đăng ký
        }
    })
}

export default $;