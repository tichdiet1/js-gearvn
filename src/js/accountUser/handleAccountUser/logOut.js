import { $, $$, $$$ } from "../../../store/index.js";
import { clickShowModel } from '../handleAccountUser/converListTab.js';

let divLogOutNode = document.createElement("div");
divLogOutNode.setAttribute(
  "class",
  "logOut-coating-accountUser logOut-coating-accountUser-js position-fixed inset-0 bg-rgba00003 z-index106"
);
divLogOutNode.innerHTML = `
    <div class="logOut logOut-js position-absolute bg-white rounded-1">
        <div class="logOut-wrap p-20px">
            <div class="logOut-icon mx-auto d-flex">
                <div class="color-FF8A00 fs-2 fw-400 m-auto">?</div>
            </div>
            <div class="logOut-title text-center fs-18px fw-400 mt-4">Bạn muốn thoát tài khoản</div>
            <div class="logOut-actions mt-20px">
                <button type="submit" class="btn btn-agree btn-agree-js py-12px px-20px w-100 fs-17px fw-500 text-white">Đồng ý</button>
                <button type="submit" class="btn btn-no btn-no-js py-12px px-20px w-100 fs-17px fw-500">Không</button>
            </div>
        </div>
    </div>
`;
let main = document.querySelector("main");
main.append(divLogOutNode);

// để ở đây thì không gọi được 2 phần tử khó hiểu
$(".js-items__logOut").addEventListener('click', clickShowModel);

$(".btn-no-js").addEventListener("click", resetLogOut);
function resetLogOut() {
    $(".logOut-coating-accountUser-js").classList.remove("active");
    $(".logOut-js").classList.remove("active");
}

$('.logOut-coating-accountUser-js').addEventListener('click', function(e) {
    if(e.target == e.currentTarget) {
        resetLogOut();
    }
})

$$('.btn-agree-js').forEach(items => {
    items.addEventListener('click', function() {
        console.log('aaa');
        resetLogOut();
        updataInterface('register');
        window.location.href = "/DAJS/src/App.html";
    })
});
function updataInterface(id) {
    // khi bấm vào đồng ý đăng xuất thì phải đăng xuất liền chứ không cần phải bấm lại reset
    let updateInterface = localStorage.getItem('dropdownHideBlockDropdown');
    if(updateInterface) {
        let converArr = JSON.parse(updateInterface);
        let objFind = converArr.find((item) => item.id == 'register');
        if(objFind.isShown) {
            objFind.classBlock = 'hide';
            objFind.classHide = 'block';
        }
        const arrMap = converArr.map((item) => {
            return item.register == 'register' ? { ...objFind } : item;
        });
        localStorage.setItem('dropdownHideBlockDropdown', JSON.stringify(arrMap));
    }
}

export default $;