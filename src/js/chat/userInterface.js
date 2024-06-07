import { pageMain , $, $$, $$$ } from '../../store/index.js';
import { arrIconHeading, arrShowIcon, arrDropdownUserSend } from '../../store/state.js';
// click vào smile thì hiện lên dropdown, phần này là phần heading loop 7 icons
const mapArrIconHeading = arrIconHeading.map((icons, index) => {
    let { svg } = icons;

    const isActive = index === 0 ? 'active' : '';

    return `
        <div class="emoji-mart-anchor-icon ${ isActive } icon-heading-hover position-relative px-1 py-12px">
            ${ svg }                                               
        </div>
    `;
}).join('');
// click vào smile thì hiện lên dropdown, phần này là phần body của 1 đống icon
const mapArrIcons = arrShowIcon.map((icons, index) => {
    let { title, arrSvg } = icons;

    const isScroll = index === 0 ? 'scroll' : '';

    const mapArrSvg = arrSvg.flatMap(items => {
        let { svg } = items;
        return `
            <li class="list-group p-6px">
                ${ svg }
            </li>
        `;
    }).join('');
    return `
        <section class="smile__body-category ${ isScroll }">
            <div class="smile__body-title px-6px py-5px bg-white">
                <span class="fs-6 fw-500">${ title }</span>
            </div>
            <ul class="mb-0 ps-0 d-flex align-items-center flex-wrap" style="column-gap: 1px;">
                ${ mapArrSvg }
            </ul>
        </section>
    `;
}).join('');
// khi user gửi tin nhắn thì hiện ra dropdown khác
let fontClass = '';
let soundClass = "";
let staffSend = "";
const arrUserSend = arrDropdownUserSend.map((items, index) => {
    let { name } = items;
    handlecheckUserSend(index)
    
    let listItem = `
        <li class="list-group userSend-item ${ soundClass } ${ staffSend } align-items-center px-3 py-1 flex-row text-000087 ${ fontClass } fw-400 hover-userSend-items">${name}</li>
    `;
    if (index === 4 || index === 6) {
        listItem += '<hr class="my-2">'; // Thêm phần tử '<hr>' vào vị trí số 5
    }
    return listItem;
}).join('');
function handlecheckUserSend(index) {
    // index = 5: âm thanh
    // index = 6: kết thúc hội thoại
    if(index == 5 || index == 6 || index == 7) {
        fontClass = '';
    } else {
        fontClass = 'fs-12px';
    }
    if(index == 5) {
        soundClass = 'dropdown-icon-items';
    } else {
        soundClass = '';
    }
    if(index == 6) {
        staffSend = 'd-none'
    } else {
        staffSend = "";
    }
}
let resultChat = `
        <div class="chat-group user-select-none">

            <div class="chat-wrap active position-absolute end-0 cursor-pointer">
                <div class="chat-content">
                    <svg width="17" height="17" fill="#ffffff" class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1f872uo" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ForumIcon"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></svg>
                    <span class="fs-13px fw-500">Chat tư vấn - Giải đáp mọi thắc mắc</span>
                </div>
            </div>

            <div class="show-chat position-absolute end-0 position-relative">
                <div class="show-chat-wrapper">
                    <div class="show-chat--heading">
                        <div class="chat--heading__content d-flex align-items-center justify-content-between">
                            <div class="chat--heading__left d-flex align-items-center">
                                <img src="/DAJS/src/assets/footer/hinh-1-chat.png" alt="" width="32" height="32" />
                                <div class="chat--heading__text">
                                    <div class="fs-13px text-white">GearVN</div>
                                    <div class="fs-14px text-hsla001007">Chat với chúng tôi</div>
                                </div>
                            </div>
                            <div class="chat--heading__right d-flex align-items-center cursor-pointer">
                                <div class="icon-bars position-relative">
                                    <svg fill="#fff" width="20" height="20" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                                    <div class="dropdown-icon-bars position-absolute bg-white rounded-1 z-index107">
                                        <div class="dropdown-icon-wrap py-2">
                                            <ul class="ps-0 mb-0">
                                                <li class="list-group dropdown-icon-items dropdown-icon-hover-items d-flex flex-row align-items-center py-1 px-3">
                                                    <div class="dropdown-icon-sound flex-1">
                                                        <svg width="20" height="20" fill="rgba(0, 0, 0, 0.54)" class="icon-soundOff" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VolumeOffIcon"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"></path></svg>
                                                        <svg width="20" height="20" fill="rgba(0, 0, 0, 0.54)" class="icon-soundOn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VolumeUpIcon"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                                    </div>
                                                    <div class="dropdown-icon-title flex-4">
                                                        <span class="rs-name text-000087 fs-12px fw-400">Âm thanh</span>
                                                    </div>
                                                </li>
                                                <hr class="my-2" />
                                                <li class="click-userName-bar list-group dropdown-icon-hover-items d-flex flex-row align-items-center py-1 px-3">
                                                    <div class="dropdown-icon-name flex-1">
                                                        <svg width="20" height="20" fill="rgba(0, 0, 0, 0.54)" class="icon-user" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountCircleIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                                                    </div>
                                                    <div class="dropdown-icon-title flex-4">
                                                        <span class="rs-username text-000087 fs-12px fw-400">User<span class="random-idUser">12364</span></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dropdown-user-send position-absolute bg-white rounded-2 shadow-lg z-index107">
                                        <div class="user-send-content py-2">
                                            <ul class="ps-0 mb-0">
                                                ${ arrUserSend }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-close">
                                    <svg fill="#fff" class="ms-12px" width="20" height="20" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="show-chat--body overflow-y-auto overflow-x-hidden bg-white">
                        <div class="chat--body__content">
                            <div class="box-chat pb-3">
                                <div class="box-chat__AIElm ps-60px">
                                    <p class="mb-0 fs-13px fw-400 d-inline-block px-20px py-10px mb-2 bg-f5f5f5 rounded-3 text-break mw-187px">
                                        GEARVN đang có nhiều chương trình khuyến mãi và ưu đãi hấp dẫn. Anh/Chị có thể nhắn tin vào khung chat để được tư vấn chi tiết.
                                    </p>
                                </div>
                                <div class="box-chat__AIElm position-relative ps-60px">
                                    <p class="mb-0 fs-13px fw-400 d-inline-block px-20px py-10px mb-2 bg-f5f5f5 rounded-3 text-break mw-187px">
                                        GEARVN đang có nhiều chương trình khuyến mãi và ưu đãi hấp dẫn. Anh/Chị có thể nhắn tin vào khung chat để được tư vấn chi tiết.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="backtotop-chat active position-absolute rounded-circle d-flex align-items-center justify-content-center cursor-pointer">
                            <svg width="20" height="20" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-11fo197" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                        </div>
                        <div class="evaluate-chat position-absolute bg-white z-index106">
                            <div class="evaluate-chat__heading p-3 text-center">
                                <div class="evaluate-chat__box mb-2">
                                    <div class="fs-14px fw-400">Hội thoại đã kết thúc, bạn có muốn đánh giá chat không?</div>
                                </div>
                                <div class="evaluate-chat__star d-flex align-items-center justify-content-between mb-3">
                                    <div class="evaluate-star flex-grow-1 cursor-pointer" data-rate="1">
                                        <svg width="58" height="58" fill="#bdbdbd" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-umvnqe" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarRateIcon"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>
                                    </div>
                                    <div class="evaluate-star flex-grow-1 cursor-pointer" data-rate="2">
                                        <svg width="58" height="58" fill="#bdbdbd" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-umvnqe" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarRateIcon"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>
                                    </div>
                                    <div class="evaluate-star flex-grow-1 cursor-pointer" data-rate="3">
                                        <svg width="58" height="58" fill="#bdbdbd" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-umvnqe" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarRateIcon"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>
                                    </div>
                                    <div class="evaluate-star flex-grow-1 cursor-pointer" data-rate="4">
                                        <svg width="58" height="58" fill="#bdbdbd" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-umvnqe" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarRateIcon"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>
                                    </div>
                                    <div class="evaluate-star flex-grow-1 cursor-pointer" data-rate="5">
                                        <svg width="58" height="58" fill="#bdbdbd" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-umvnqe" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarRateIcon"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>
                                    </div>
                                </div>
                                <div class="ratings-name"></div>
                                <div class="leave-evaluate position-relative px-0">
                                    <textarea name="" id="leave-evaluateInput" placeholder="" class="resize-none w-100 h-100 px-14px py-3 rounded-2"></textarea>
                                    <label for="leave-evaluate" class="fs-14px">Để lại nhận xét</label>
                                </div>
                            </div>
                            <div class="evaluate-chat__footer">
                                <div class="evaluate-chat__box pt-4 px-3 pb-2 border-top">
                                    <div class="evaluate-chat__btnGroup text-center d-flex align-items-center">
                                        <button class="evaluate-chat__send hover-sendAndSkip bg-2392740 text-white border-0 py-2 px-3 me-3 flex-1 rounded-1 text-uppercase fw-500 fs-12px">gửi</button>
                                        <button class="evaluate-chat__skip hover-sendAndSkip bg-2392740 text-white border-0 py-2 px-3 flex-1 rounded-1 text-uppercase fw-500 fs-12px">bỏ qua</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="show-chat--footer">
                        <div class="chat--footer__content position-relative d-flex justify-content-between bg-white border-top pt-3 pe-3 pb-7px">
                            <div class="chat--footer-left">
                                <textarea name="message-input" id="message-input" class="border-0 resize-none" maxlength="1000" placeholder="Nhập nội dung…"></textarea>
                            </div>
                            <div class="chat--footer-right d-flex flex-column align-items-end">
                                <div class="chat--footer-icons cursor-pointer d-flex justify-content-end">
                                    <div class="icon-like__wrap hover-like position-relative">
                                        <span class="icon-like position-relative hover-rounded-circle">
                                            <svg class="position-relative" fill="rgba(0, 0, 0, 0.54)" width="20" height="20" focusable="false"  aria-hidden="true" viewBox="0 0 24 24" data-testid="ThumbUpIcon"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path></svg>
                                        </span>
                                        <span class="chat-dropdown position-absolute fs-10px text-white fw-500 rounded-1 text-nowrap px-2">Đánh giá cuộc trò chuyện này</span>
                                        <div class="like-star-group position-absolute shadow-lg bg-white rounded-4">
                                            <div class="like-star-content p-1 d-flex align-items-center justify-content-between">
                                                <div class="like-star-staff selected" data-rate="1">
                                                    <svg width="25" height="25" fill="#bdbdbd" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                                </div>
                                                <div class="like-star-staff" data-rate="2">
                                                    <svg width="25" height="25" fill="#bdbdbd" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                                </div>
                                                <div class="like-star-staff" data-rate="3">
                                                    <svg width="25" height="25" fill="#bdbdbd" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                                </div>
                                                <div class="like-star-staff" data-rate="4">
                                                    <svg width="25" height="25" fill="#bdbdbd" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                                </div>
                                                <div class="like-star-staff" data-rate="5">
                                                    <svg width="25" height="25" fill="#bdbdbd" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="icon-file-wrap">
                                        <span class="icon-file position-relative hover-rounded-circle">
                                            <svg class="position-relative" fill="rgba(0, 0, 0, 0.54)" width="20" height="20" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachFileOutlinedIcon"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></svg>
                                        </span>
                                        <input type="file" id="send-file" hidden />
                                        <div class="showCoating-click-img position-fixed top-0 end-0 bottom-0 start-0 bg-rgba00003 z-index102">
                                            <div class="icon-close-file text-end cursor-pointer">
                                                <svg width="32" height="32" aria-hidden="true" class="pswp__icn" viewBox="0 0 32 32"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-close"></use><path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"></path></svg>
                                            </div>
                                            <div class="click-img__content position-absolute top-50 start-50 translate-middle">
                                                <img src="" alt="" class="click-img__elm cursor-zoom-out" width="200" height="200" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="icon-smile__wrap position-relative">
                                        <span class="icon-smile position-relative hover-rounded-circle">
                                            <svg class="position-relative" fill="rgba(0, 0, 0, 0.54)" width="20" height="20" focusable="false" viewBox="0 0 24 24"><circle cx="15.5" cy="9.5" r="1.5"></circle><circle cx="8.5" cy="9.5" r="1.5"></circle><path d="M12 18c2.28 0 4.22-1.66 5-4H7c.78 2.34 2.72 4 5 4z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                                        </span>
                                    </div>
                                    <div class="d-none">
                                        <span class="icon-send position-relative">
                                            <svg class="position-relative" fill="rgb(239, 27, 40)" width="20" height="20" focusable="false" viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                                <div class="cursor-pointer text-end w-100">
                                    <img src="/DAJS/src/assets/footer/hinh-2-chat.png" alt="" width="45" height="9" />
                                </div>
                            </div>
                            <div class="icon-smile__group position-absolute rounded-1 bg-white">
                                <div class="icon-smile__content">
                                    <div class="icon-smile__heading border-bottom">
                                        <div class="smile__heading-box px-6px d-flex align-items-center justify-content-between">
                                            ${ mapArrIconHeading }
                                        </div>
                                    </div>
                                    <div class="icon-smile__body position-relative">
                                        <div class="smile__body-content px-6px">
                                            <div class="smile__body-searchWrap">
                                                <div class="smile__body-search pt-6px position-relative">
                                                    <input type="text" class="smile__body-input w-100 h-100 ps-10px pe-25px border fs-6 fw-400 pt-5px pb-6px" placeholder="Search" />
                                                    <button class="icon-search-button icon-search-searchChat position-absolute translate-middle-y">
                                                        <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" opacity="0.5"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
                                                    </button>
                                                    <button class="icon-search-button icon-xmark-searchChat position-absolute translate-middle-y">
                                                        <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" opacity="0.5"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="smile__body-wrap">
                                                ${ mapArrIcons }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown-userName-coating position-absolute">
                    <div class="dropdown-userName position-absolute bg-white">
                        <div class="dropdown-userName__body p-2">
                            <div class="dropdown-userName__title">
                                <p class="mb-0 fs-14px fw-500">Thông tin cơ bản</p>
                            </div>
                            <div class="dropdown-userName__inputGroup mt-3 mb-2">
                                <div class="dropdown-inputContent position-relative">
                                    <input type="text" id="user-name-input" class="user-name-input text-000087 fs-14px fw-400 w-100 h-100 border px-14px py-2 rounded-3" placeholder="" autocomplete="off" />
                                    <label for="user-name-input" class="user-name-label text-000087 fs-14px fw-400 position-absolute top-50 translate-middle-y bg-white px-2">Nhập tên của bạn*</label>
                                </div>
                                <span class="user-name-error text-2114747 fs-10px ps-22px d-none">Tên chưa được nhập !</span>
                            </div>
                        </div>
                        <div class="dropdown-userName__bottom border-top">
                            <div class="userName__bottom-box pt-2 pb-6px d-flex align-items-center px-2">
                                <button class="btn-userName-cancel text-white fw-500 bg-113113113 flex-1 me-2 rounded-2 border-0 px-3 py-6px">Hủy</button>
                                <button class="btn-userName-save text-white fw-500 bg-2392740 flex-1 ms-2 rounded-2 border-0 px-3 py-6px">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="f-conversation__coating position-absolute top-0 end-0 bottom-0 start-0 bg-rgba00003 z-index106">
                    <div class="f-conversation__content position-absolute top-50 start-50 translate-middle">
                        <div class="f-conversation__wrap rounded-1 bg-white shadow-lg">
                            <div class="f-conversation__alert">
                                <div class="f-conversation__title py-3 px-4">
                                    <h2 class="mb-0 fw-500 fs-17px">Thông báo</h2>
                                </div>
                                <div class="f-conversation__body px-4 pb-20px">
                                    <p class="mb-0 text-rgba0006 fs-14px fw-400">Bạn có muốn kết thúc chat không?</p>
                                </div>
                                <div class="f-conversation__footer d-flex justify-content-between p-2">
                                    <div></div>
                                    <div class="f-conversation__btnGroup d-flex align-items-center">
                                        <button class="f-conversation__cancel flex-1 fs-12px fw-400 py-5px px-15px hover-f-conversation__cancel text-uppercase border rounded-1 text-nowrap h-100">hủy</button>
                                        <button class="f-conversation__end flex-1 fs-12px fw-400 py-6px px-3 hover-f-conversation__end text-uppercase text-white rounded-1 border-0 text-nowrap ms-2 h-100">kết thúc</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
let div = document.createElement('div');
div.setAttribute('class','chat position-fixed bottom-0 end-0 z-index106');
div.innerHTML = resultChat;
let body = document.body;
body.appendChild(div);
export default resultChat;