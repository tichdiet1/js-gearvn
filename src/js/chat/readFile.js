import { pageMain , $, $$, $$$ } from '../../store/index.js';
import { scrollEndOfPage } from './chat.js';
export function readUrl(inputFile, arrImgFile) {
    if (inputFile.files) {
        for (let i = 0; i < inputFile.files.length; i++) {
            const reader = new FileReader();
            const file = inputFile.files[i];
            arrImgFile.push(file);
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                renderImgFile(e.target.result);
            };
        }
    }
}

export function renderImgFile(imageSrc) {
    let div = document.createElement('div');
    div.setAttribute('class', 'elm-file text-end pe-3');
    let stringContent = `
        <img src="${imageSrc}" alt="" class="img-file cursor-zoom-in" width="100" height="100" />
    `;
    div.innerHTML = stringContent;
    $('.box-chat').appendChild(div);
    scrollEndOfPage();

    // click vào từng hình ảnh khi đã gửi hình ảnh thành công
    $$('.elm-file').forEach(items => {
        items.onclick = function() {
            $('.showCoating-click-img').classList.add('active');
            $('.click-img__content').classList.add('active');
            $('.click-img__elm').src = imageSrc;
        }
    })
    $('.icon-close-file').onclick = function() {
        removeAllClassFile();
    }
    $('.showCoating-click-img').onclick = function(e) {
        handleClickCoatingFile(e)
    }
    function handleClickCoatingFile(e) {
        if(e.target == e.currentTarget) {
            removeAllClassFile();
        }
    }
    function removeAllClassFile() {
        $('.showCoating-click-img').classList.remove('active');
        $('.click-img__content').classList.remove('active');
    }
}
export default readUrl;