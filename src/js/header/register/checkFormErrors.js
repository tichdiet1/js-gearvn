import { $, $$, $$$ } from '../../../store/index.js';
/** 6 kiểu dữ liệu falsy: falsy hiểu đơn giản là trả về dạng boolean.
 * undefined: biến chưa được khai báo hoặc element chưa tồn tại trong 1 đối tượng.
 * null: biến đã được khai báo và element đã tồn tại trong đối tượng thì dùng null.
 * số 0.
 * NaN: không phải là 1 số. vd: '', true, false, undefined, null. nhưng '123' hay 123 đều true.
 * '': làm việc với chuỗi thì khai báo rất hợp lý.
 * boolean: làm cờ rất hiệu quả.
 */
// ----lý do để 2 thằng này ở ngoài là vì dùng để check form khi check đúng hết toàn bộ các trường-----------
// check focus từ element đầu tiên
let firstInvalidField = null;
// -----biến này dùng để trả về true hoặc false---------------
let isvalid = true;
// ---------------------

// ------------check người dùng focus vào bất kỳ trường nào sau đó submit thì vẫn được focus vào trường mà người dùng đã focus--------------
// phần được ưu tiên submit trước
let focusedField = null;
let allInputFields = document.querySelectorAll('.register-body__wrap input');
allInputFields.forEach(function(field) {
    field.addEventListener('focus', function() {
        focusedField = this;
    });
});
/** - khi focus vào trường xác nhận mật khẩu thì trường mật khẩu phải về lại trường nhập fullName
 * - bước thực hiện: xóa đi sự kiện focus là xong => đã xong
 */
// --------------------------
// submit: check toàn bộ form, chỉ cần có 1 form có required thì submit sẽ không được trả về
$$$('form-register').addEventListener('submit', function(e) {
    // để e.preventDefault(); trước validateForm(); để phòng trường hợp báo lỗi thì k reload lại trang
    e.preventDefault();
    if(validateForm()) {
        console.log('location.href="Truyền đường dẫn vào để chuyển hướng trang"');
    } else {
        e.preventDefault();
    }
});
function isValidateFullname() {
    const fullNameElm = $$$('register-fullName');

    const fullName = fullNameElm.value.trim();

    // ---------cách check thuần bằng tay, làm vầy mỏi tay(tham khảo thôi)-----------
    // if (!fullName) {
    //     return false;
    // } else if(!(fullName.length > 2 && fullName.length <= 30)) {
    //     // check độ dài chuỗi
    //     return false;
    // } else if(fullName.includes('_')) {
    //     return false;
    // } else {
    //     focusedField = $$$('register-email');
    // }
    // --------------------

    // --------------------
    // đây là cách check bằng tay kết hợp với regix
    // check rỗng
    if (!isFullNameValid(fullName)) {
        return false;
    } else if(!(fullName.length > 2 && fullName.length <= 30)) {
        // check độ dài chuỗi
        return false;
    } else {
        focusedField = $$$('register-email');
    }
    // --------------------
    
    // --------------------
    // đây là cách check bằng regix
    // if(!isFullNameValid(fullName)) {
    //     return false;
    // } else {
    //     focusedField = $$$('register-email');
    // }
    // --------------------
    // nếu đặt if check độ dài chuỗi ở dưới đây thì nó sẽ kiểm tra nếu if đầu tiên đúng thì sẽ không chạy tới if thứ 2

    return true;
}
function isFullNameValid(fullName) {
    /** những tên sai
     * ''
     * kk
     * khanh_
     * khanh1
     * khanh_1
     * 0
     */
    /**
     * ^ và $ là ký tự bắt đầu và kết thúc chuỗi.
     * [a-zA-Z.] là một class ký tự chứa các ký tự từ a-z, A-Z và dấu chấm.
     * + là toán tử lặp, đảm bảo chuỗi phải chứa ít nhất 1 ký tự trong class ký tự.
     */
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    const regex = /^[a-zA-Z\s]{2,30}/;
    // ^ && + phối hợp với nhau thì sẽ check được chuỗi rỗng;
    return regex.test(fullName);
}
function validateEmail() {
    const emailElm = $$$('register-email');

    const email = emailElm.value.trim();
    // cách 1
    // check rỗng
    // if (!email) {
    //     return false;
    // } else if(!isEmailValid(email)) {
    //     return false;
    // } else if(!email.toLowerCase().includes('gmail')) {
    //     return false;
    // } else {
    //     focusedField = $$$('register-password');
    // }
    // cách 2
    if (!email) {
        return false;
    } else if(!isGmailValid(email)) {
        return false;
    } else {
        focusedField = $$$('register-password');
    }

    return true;
}
function isGmailValid(email) {
    const gmailRegex = /^[\w-\.]+@gmail\.com$/;
    return gmailRegex.test(email);
}
function validatePassword() {
    const passwordElm = $$$('register-password');
    const passwordValue = passwordElm.value.trim();
    // Check first 8 characters are digits
    const firstEightChars = passwordValue.slice(0, 8);
    // Check remaining characters contain at least one special character, one lowercase letter, and one number
    const remainingChars = passwordValue.slice(8);

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(remainingChars);
    // chứa ít nhất 1 ký tự viết hoa
    const hasUpperCase = /[A-Z]/.test(remainingChars);
    // chứa ít nhất 1 ký tự viết thường
    const hasLowercase = /[a-z]/.test(remainingChars);
    // chứa ít nhất 1 chữ số
    const hasNumber = /\d/.test(remainingChars);
    // check rỗng
    if(!passwordValue) {
        return false;
    } else if(!(passwordValue.length > 6 && passwordValue.length <= 30)) {
        return false;
    } else if(!/^\d{8}/.test(firstEightChars)) {
        return false;
    } else if(!hasSpecialChar) {
        return false;
    } else if(!hasUpperCase) {
        return false;
    } else if(!hasLowercase) {
        return false;
    } else if(!hasNumber) {
        return false;
    } else {
        focusedField = $$$('register-passwordConfirmation');
    }
    return true;
}
function validateConfirmationPassword() {
    const passwordElm = $$$('register-password');
    const passwordConfirmationElm = $$$('register-passwordConfirmation');
    
    const passwordValue = passwordElm.value.trim();
    const passwordConfirmationElmValue = passwordConfirmationElm.value.trim();

    // check rỗng
    if(!passwordConfirmationElmValue) {
        return false;
    } else if(!(passwordConfirmationElmValue === passwordValue)) {
        return false;
    } else if(!(passwordConfirmationElmValue.length === passwordValue.length)) {
        return false;
    }
    // không để cho chạy vào trường passwordCofirm khi đã check đúng, lưu ý khúc này return vể bằng true nên sẽ có 1 lỗi xảy ra
    focusedField = null;
    firstInvalidField = null;
    isvalid = true;
    return true;
}
function showMessageFullName() {
    const fullNameElm = $$$('register-fullName');
    const fullName = fullNameElm.value.trim();
  
    if (!fullName) {
        return 'Nhập họ tên';
      } else if (!(fullName.length > 2 && fullName.length <= 30)) {
        return 'Phải nhập ít nhất 3 ký tự và <= 30 ký tự';
    }

    return true;
}
function showMessageGmail() {
    const emailElm = $$$('register-email');
    const email = emailElm.value.trim();

    const emailParts = email.split('@');
    const localPart = emailParts[0];
    const hasLetter = /[a-zA-Z]/.test(localPart);

    if (!email) {
        return 'Nhập email';
    } else if(!isGmailValid(email) || !hasLetter) {
        /** check 1 thằng này thôi là đủ !isGmailValid(email)
         * check 1 tk này thôi thì mệt !hasLetter nhưng tk này cũng giúp ích cho check chuỗi sau @gmail.com
         */
        return 'Email không đúng';
    }
    
    return true;
}
function showMessagePassword() {
    const passwordElm = $$$('register-password');
    const passwordValue = passwordElm.value.trim();
    // Check first 8 characters are digits
    const firstEightChars = passwordValue.slice(0, 8);
    // check từ 8 ký tự trở về sau
    const remainingChars = passwordValue.slice(8);

    // chứa ít nhất 1 ký tự đặc biệt
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(remainingChars);
    // chứa ít nhất 1 ký tự viết hoa
    const hasUpperCase = /[A-Z]/.test(remainingChars);
    // chứa ít nhất 1 ký tự viết thường
    const hasLowercase = /[a-z]/.test(remainingChars);
    // chứa ít nhất 1 số (0-9)
    const hasNumber = /\d/.test(remainingChars);
    // check rỗng
    if(!passwordValue) {
        return 'Chưa nhập mật khẩu';
    } else if(!(passwordValue.length > 7 && passwordValue.length <= 30)) {
        return 'Mật khẩu ít nhất 8 ký tự.<br/>Mật khẩu không khớp.';
    } else if(!/^\d{8}/.test(firstEightChars)) {
        return '8 ký tự đầu tiên phải là số.<br/>Mật khẩu không khớp.';
    } else if(!hasSpecialChar) {
        return 'Chứa ít nhất 1 ký tự đặc biệt.<br/>Mật khẩu không khớp.';
    } else if(!hasUpperCase) {
        return 'Chứa ít nhất 1 ký tự viết hoa.<br/>Mật khẩu không khớp.';
    } else if(!hasLowercase) {
        return 'Chứa ít nhất 1 ký tự viết thường.<br/>Mật khẩu không khớp.';
    } else if(!hasNumber) {
        return 'Chứa ít nhất 1 số (0-9).<br/>Mật khẩu không khớp.';
    }

    return true;
}
function showMessagePasswordConfirm() {
    const passwordElm = $$$('register-password');
    const passwordConfirmationElm = $$$('register-passwordConfirmation');
    
    const passwordValue = passwordElm.value.trim();
    const passwordConfirmationElmValue = passwordConfirmationElm.value.trim();

    // check rỗng
    if(!passwordConfirmationElmValue) {
        if(passwordValue) {
            return 'Mật khẩu không khớp.';
        }
        return '';
    } else if(!(passwordConfirmationElmValue === passwordValue) && !(passwordConfirmationElmValue.length === passwordValue.length)) {
        return 'Mật khẩu không khớp.';
    }

    return true;
}
function validateForm() {
    checkFocusEachSchool();
    showMessageAllForm();
    // --------------------------
    if (!isvalid) {
        showMessageAllForm();
        // Kiểm tra trường email đã nhập chưa
        // if ($$$('register-email').value.trim() !== '' && $$$('register-fullName').value.trim() === '') {
        //     // Email đã nhập, fullName chưa, focus về fullName
        //     $$$('register-fullName').focus();
        //     focusedField = $$$('register-fullName');
        // }
        if (focusedField) {
            focusedField.focus();
            // if(checkFocusVariableTwo()) {
            //     focusedField = checkFocusVariableTwo();
            //     focusedField.focus();
            // }
        } else if (firstInvalidField) {
            firstInvalidField.focus();
            console.log('ccc');
        }
        return false;
    }
    $('.js-register-show-errors').classList.remove('errors');
    $('.js-register-show-errors span').innerText = '';
    return true;
}
// phần này của validateForm()
function checkFocusEachSchool() {
    if (!isValidateFullname()) {
        isvalid = false;
        /**
         * lưu ý: khi mà gán biến giống nhau và ngang cấp nhau thì nó luôn luôn chạy thằng cuối cùng.
         * cách giải quyết là check null: nếu đúng là null thì sẽ chạy thằng đầu tiên.
         */
        // nếu không check null thì sẽ bị vào focus vào thằng cuối cùng.
        if (!firstInvalidField) { // kiểm tra thằng đầu tiên, nếu mà thằng đầu tiên đúng thì chạy thằng đầu tiên luôn
            // đặt 4 trường này ra ngoài if là sẽ nhận được bài học khó hiểu
            firstInvalidField = $$$('register-fullName');
        }
    }

    if (!validateEmail()) {
        isvalid = false;
        if (!firstInvalidField) {
            firstInvalidField = $$$('register-email');
        }
    }

    if (!validatePassword()) {
        isvalid = false;
        if (!firstInvalidField) {
            firstInvalidField = $$$('register-password');
        }
    }

    if (!validateConfirmationPassword()) {
        isvalid = false;
        if (!firstInvalidField) {
            firstInvalidField = $$$('register-passwordConfirmation');
        }
    }
}
// phần này của validateForm()
function showMessageAllForm() {
    let errorMessage = '';
    if (!isValidateFullname()) {
        const fullNameValidation = showMessageFullName();
        if(fullNameValidation !== true) { // check để không trả về undefined khi đã check là true
            errorMessage += fullNameValidation + '<br>';
        }
    }
    if (!validateEmail()) {
        const emailValidation = showMessageGmail();
        if(emailValidation !== true) { // check để không trả về undefined khi đã check là true
            errorMessage += emailValidation + '<br>';
        }
    }
    if (!validatePassword()) {
        const passwordValidation = showMessagePassword();
        if(passwordValidation !== true) { // check để không trả về undefined khi đã check là true
            errorMessage += passwordValidation + '<br>';
        }
    }
    if (!validateConfirmationPassword()) {
        // sau khi check true hết toàn bộ thì lại trả về gmail lý do đã gán cho biến focusedField = null
        const passwordConfirmValidation = showMessagePasswordConfirm();
        if(passwordConfirmValidation !== true) {
            errorMessage += passwordConfirmValidation;
        }
    }
    // ----------bị lỗi-----------
    /**
     * { validateForm(); e.preventDefault(); } nếu ở submit mà đặt như vầy có báo lỗi thì form cũng reset chả bao giờ fix được lỗi.
     * lý do 2: cho focusedField = null và isvalid = true thì nó sẽ thoát khỏi if lúc này thì k còn focus hoặc để lại trường show message.
     */
    $('.js-register-show-errors').classList.add('errors');
    $('.js-register-show-errors span').innerHTML = errorMessage;
    // -----------cách giải quyết----------
    // const accountErrorsElement = $('.js-register-show-errors');
    // if (accountErrorsElement) {
    //     accountErrorsElement.classList.add('errors');
    //     const accountErrorsSpan = accountErrorsElement.querySelector('span');
    //     if (accountErrorsSpan) {
    //         accountErrorsSpan.innerHTML = errorMessage;
    //     }
    // }
    // ---------------------
}

// phần css copy chữ "js register" rồi ctrl + f tìm kiếm là ra phần css

// ngăn trặn hành vi mặc định show error của input type email
const emailInput = document.querySelectorAll('register-email');
emailInput.forEach(item => {
    item.addEventListener('invalid', function (event) {
        event.preventDefault();
    });
})
export default $;