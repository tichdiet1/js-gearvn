import { pageMain, $, $$ } from "../../../store/index.js";
// ---------random id user 1 lần duy nhất-----------
let saveChatInput = sessionStorage.getItem('saveChatInput');
let initialRandomNumber = sessionStorage.getItem('initialRandomNumber');
if(saveChatInput) {
    // $('.rs-username').innerText = saveChatInput;
    $$('.rs-username').forEach(items => {
        // nếu mà dùng innerText thì nó sẽ xuất ra chuỗi string thô bao gồm thẻ span cũng biến thành chuỗi thô luôn mà k biến thành thẻ dom span được
        items.innerHTML = saveChatInput
    })
} else {
    // $('.random-idUser').innerText = renderRandom();
    $$('.random-idUser').forEach(items => {
        items.innerHTML = renderRandom();
    })
}
function randomUserNumbers() {
    // { length: 10 }: iterable(có thể lặp lại) tạo ra 10 vị trí tương ứng với 10 vị trí trong mảng mới, nếu không return về gì thì nó sẽ trả về undefined 
    var numbers = Array.from({ length: 9 }, function () {
        return Math.floor(Math.random() * 10);
    }); // 1 mảng chứa 10 số ngẫu nhiên
    // dùng join để chuyển mảng về 1 chuỗi, dấu "" dùng để xóa chuỗi thừa và dấu phẩy

    // Thay thế Array.from bằng map
    var numbers = Array.from({ length: 9 }).map(function () {
        return Math.floor(Math.random() * 10);
    });
  
    // Sử dụng arrow function
    var numbers = Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 10));
    
    // Sử dụng cú pháp rút gọn
    var numbers = [...Array(9)].map(() => Math.floor(Math.random() * 10));

    return numbers.join("");
}
function renderRandom() {
    // https://www.w3schools.com/jsref/jsref_type_conversion.asp link chuyển đổi giữa boolean
    // typeof initialRandomNumber(string) => null => true mà khác true thì là false
    // cờ là null, khác null thì là true, chạy lần 2 thì là true, khác true thì là false
    if (!initialRandomNumber) {// null mà !null thì = true
        initialRandomNumber = randomUserNumbers();
        sessionStorage.setItem('initialRandomNumber', initialRandomNumber);
    }
    return initialRandomNumber;
}
function customRenderIdUser() {
    // từ mảng numbers: vị trí số 2 và số 4 phải tách nhau ra còn lại thì không cần
    const randomIdUsers = document.querySelectorAll('.random-idUser');
    randomIdUsers.forEach(element => {
        let inputString = element.innerHTML;
        let result = "";
        
        for (let i = 0; i < inputString.length; i++) {
            let char = inputString[i];
            let number = parseInt(char);

            if (!isNaN(number) && i >= 2 && i <= 3) {
                result += `<span class="active">${char}</span>`;
            } else {
                result += char;
            }
        }
        element.innerHTML = result;
    });
}
customRenderIdUser();
export default saveChatInput;
// --------------------