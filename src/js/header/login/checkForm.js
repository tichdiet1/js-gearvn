import { $, $$, $$$ } from '../../../store/index.js';

// phần được ưu tiên submit trước
let focusedField = null;
$$$('login-email').addEventListener('focus', function(e) {
    if(e.target.value.trim() === "") {
        focusedField = e.target;
    }
});
$$$('login-email').addEventListener('input', function(e) {
    if(e.target.value.trim() === "") {
        focusedField = e.target;
    } else {
        if($$$('login-email').value.trim() == "") {
            focusedField = $$$('login-email');
        } else if($$$('login-password').value.trim() == "") {
            focusedField = $$$('login-password');
        }
    }
});
$$$('login-password').addEventListener('focus', function(e) {
    if(e.target.value.trim() === "") {
        focusedField = e.target;
    }
});
$$$('login-password').addEventListener('input', function(e) {
    if(e.target.value.trim() === "") {
        focusedField = e.target;
    } else {
        if($$$('login-email').value.trim() == "") {
            focusedField = $$$('login-email');
        } else if($$$('login-password').value.trim() == "") {
            focusedField = $$$('login-password');
        }
    }
});
function updataInterface(id) {
    // khi bấm vào đồng ý đăng xuất thì phải đăng xuất liền chứ không cần phải bấm lại reset
    let updateInterface = localStorage.getItem('dropdownHideBlockDropdown');
    if(updateInterface) {
        let converArr = JSON.parse(updateInterface);
        let objFind = converArr.find((item) => item.id == 'register');
        if(objFind.isShown) {
            objFind.classBlock = 'block';
            objFind.classHide = 'hide';
        }
        const arrMap = converArr.map((item) => {
            return item.register == 'register' ? { ...objFind } : item;
        });
        localStorage.setItem('dropdownHideBlockDropdown', JSON.stringify(arrMap));
    }
}
$$$('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateForm()) {
        console.log('chuyển trang');
        updataInterface('register');
        location.href = '/DAJS/src/App.html';
    } else {
        console.log('ngăn chặn chuyển trang');
        // ngăn chặn khi báo lỗi thì k được reset form
        e.preventDefault();
    }
})
function validateEmail() {
    const emailElm = $$$("login-email");
    const email = emailElm.value.trim();
    
    // Thêm kiểm tra định dạng email tại đây
    if (!email || !isValidEmail(email)) {
      return false;
    }
    
    return true;
}

function isValidEmail(email) {
    // Thêm logic kiểm tra định dạng email hợp lệ tại đây
    // Ví dụ: sử dụng RegExp
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
function showMessageEmail() {
    const emailElm = $$$('login-email');
    const email = emailElm.value.trim();

    if (!email) {
        return 'Trường tên người dùng là bắt buộc';
    }

    return true;
}

function validatePassword() {
    const passwordElm = $$$('login-password');
    const passwordValue = passwordElm.value.trim();

    if(!passwordValue) {
        return false;
    }

    return true;
}
function showMessagePassword() {
    const passwordElm = $$$('login-password');
    const passwordValue = passwordElm.value.trim();

    if(!passwordValue) {
        return 'Trường mật khẩu là bắt buộc';
    }

    return true;
}
function validateForm() {
    let firstInvalidField = null;
    let isvalid = true;

    if(!validateEmail()) {
        isvalid = false;

        if(!firstInvalidField) {
            firstInvalidField = $$$('login-email');
        }
    }
    if(!validatePassword()) {
        isvalid = false;

        if(!firstInvalidField) {
            firstInvalidField = $$$('login-password');
        }
    }
    
    if(!isvalid) {
        showAllMessage();
        
        if(focusedField) {
            focusedField.focus();
        } else if(firstInvalidField) {
            firstInvalidField.focus();
        }

        return false;
    }
    
    // Reset the error display
    

    if(checkLogin()) {
        $('.js-login-show-errors').classList.remove('errors');
        $('.js-login-show-errors').innerHTML = "";
        return true;
    } else {
        $('.js-login-show-errors').classList.add('errors');
        $('.js-login-show-errors').innerHTML = "Tài khoản hoặc mật khẩu không đúng.";
    }
}
function checkLogin() {
    const emailElm = $$$('login-email');
    const email = emailElm.value.trim();
    const passwordElm = $$$('login-password');
    const passwordValue = passwordElm.value.trim();

    let getSaveLoginUser = localStorage.getItem("saveLoginUser");
    if (getSaveLoginUser) {
        let convertArr = JSON.parse(getSaveLoginUser);
        let checkSome = convertArr.some(item => item.emailElm == email && item.passwordElm == passwordValue);
        return checkSome;
    }
}
function showAllMessage() {
    let errorMessage = '';
    
    if(!validateEmail()) { // đúng là không phải là false nên chạy vào if else 
        const emailStringMessage = showMessageEmail();
        if(emailStringMessage !== true) {
            errorMessage += emailStringMessage + '<br/>';
        }
    }
    if(!validatePassword()) { // đúng là không phải là false nên chạy vào if else 
        const passwordStringMessage = showMessagePassword();
        if(passwordStringMessage !== true) {
            errorMessage += passwordStringMessage + '<br/>';
        }
    }

    $('.js-login-show-errors').classList.add('errors');
    $('.js-login-show-errors').innerHTML = errorMessage;
}
export default $;