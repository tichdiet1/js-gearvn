import { pageMain, $, $$ } from "../../../store/index.js";
import { arrShowIcon, arrShowIconSearch } from '../../../store/state.js';
$('.smile__body-input').addEventListener('keyup', function() {
    const inputValue = this.value;
    if(inputValue) {
        // ở chỗ này mà khai báo không còn const thì filterValue sẽ báo lỗi is not defined
        const filterValue = arrShowIconSearch.filter(items => {
            return items.title.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase());
        })
        console.log(filterValue);
        render(filterValue);
        // phải để render ở trên, nếu để ở dưới thì không thể chạy code được
        if(!filterValue?.length) {
            $('.smile__body-wrap').innerHTML = `
                <div class="search-notFount position-absolute top-50 start-50 translate-middle">
                    <div class="search-notFount-img text-center">
                        <span style="width: 38px; height: 38px; display: inline-block; background-image: url(&quot;https://unpkg.com/emoji-datasource-twitter@5.0.1/img/twitter/sheets-256/64.png&quot;); background-size: 5700% 5700%; background-position: 51.7857% 48.2143%;"></span>
                    </div>
                    <span>No Emoji Found</span>
                </div>
            `;
        }
        $('.smile__body-search').classList.add('active');
    } else {
        render(arrShowIcon);
        $('.smile__body-search').classList.remove('active');
    }
})
export function render(arrShowIcon) {
    $('.smile__body-wrap').innerHTML = arrShowIcon.map(items => {
        let { title, arrSvg } = items;

        $$('.smile__body-category').forEach(element => {
            element.classList.remove('scroll');
        });

        const mapArrSvg = arrSvg.flatMap(items => {
            let { svg } = items;
            return `
                <li class="list-group p-6px">
                    ${ svg }
                </li>
            `;
        }).join('');

        return `
            <section class="smile__body-category">
                <div class="smile__body-title px-6px py-5px bg-white">
                    <span class="fs-6 fw-500">${ title }</span>
                </div>
                <ul class="mb-0 ps-0 d-flex align-items-center flex-wrap" style="column-gap: 1px;">
                    ${ mapArrSvg }
                </ul>
            </section>
        `;
    }).join('');
}
render(arrShowIcon);

$('.icon-xmark-searchChat').addEventListener('click', function() {
    $('.smile__body-input').value = '';
    render(arrShowIcon);
    $('.smile__body-search').classList.remove('active');
})
export default pageMain;