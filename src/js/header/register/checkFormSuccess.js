import { $, $$, $$$ } from "../../../store/index.js";

/** Những trường hợp gặp phải
 * 1. submit toàn bộ thì focus phải lên thằng rỗng đầu tiên.
 * 2. sau khi submit thì đã kích hoạt focus ở bên ngoài nên là tuyệt đối phải code ở bên ngoài chứ k bỏ trong submit nữa, sẽ gặp lỗi.
 * 3. check trùng email.
 * 4. check lỗi showError.
 * 5. sự kiện focus và input, nếu nhập trường fullName là true sau đó nhảy sang trường email thì ok, nhưng khi quay lại
 * nhập trường fullName lại nhập input nhập sai thì trường fullName sẽ không check lỗi nữa mà nó sẽ chạy xuống trường email
 * sau đó phải focus lại thì mới kích hoạt lại trường fullName.
 */

// làm phần chuyển đổi dropdown khi đăng ký thành công
const dropdownSettings = [
  {
    id: 'register',
    isShown: false,
    classHide: '',
    classBlock: ''
  },
  // 2 thằng obj này không sài tới, để đó chủ đích là để hiểu localStorage và lọc mảng mà thôi mà thôi
  {
    id: 'login',
    isShown: false,
    classHide: '',
    classBlock: ''
  },
  {
    id: 'logOut',
    isShown: false,
    classHide: '',
    classBlock: ''
  }
];
function saveHideBlockDropdown(id) {
  const arr = dropdownSettings.find((item) => item.id == id);
  if(arr) {
    arr.isShown = !arr.isShown;
    if(arr.isShown) {
      arr.classHide = 'hide';
      arr.classBlock = 'block';
    }
    console.log(arr);
    localStorage.setItem('dropdownHideBlockDropdown', JSON.stringify(dropdownSettings));
  }
}

// submit
$$$("form-register").addEventListener("submit", function (e) {
  // để e.preventDefault(); trước validateForm(); để phòng trường hợp báo lỗi thì k reload lại trang
  e.preventDefault();
  if (validateForm()) {
    console.log("chuyển trang");
    // ẩn phần show dropdown register login
    saveHideBlockDropdown('register');
    // mảng này sẽ bị thay đổi do code chạy từ trên xuống dưới
    // console.log(dropdownSettings);
    
    window.location.href = "/DAJS/src/components/accountUser.html";
  } else {
    e.preventDefault();
  }
});

let firstInvalidField = null;
let focusedField = null;
// ngoại trừ trường passwordConfirmationElm thì tất cả trường khác khi focus từng ô sau đó submit thì sẽ giữ event focus() tại đúng trường đó
let allInputFields = document.querySelectorAll(".register-body__wrap input");
allInputFields.forEach(function (field) {
  if (field !== $$$("register-passwordConfirmation")) {
    field.addEventListener("focus", function () {
      focusedField = this;
    });
  }
});
// ------------check trường passwordConfirm nếu rỗng thì trả về Trường rỗng gần nhất, nếu không rỗng thì giữ nguyên focus tại trường passwordConfirm--------------
$$$("register-passwordConfirmation").addEventListener("focus", function (e) {
  if (e.target.value.trim() === "") {
    if ($$$("register-fullName").value.trim() === "") {
      focusedField = $$$("register-fullName");
    } else if ($$$("register-email").value.trim() === "") {
      focusedField = $$$("register-email");
    } else if ($$$("register-password").value.trim() === "") {
      focusedField = $$$("register-password");
    }
  } else {
    focusedField = e.target;
  }
});
$$$("register-passwordConfirmation").addEventListener("input", function (e) {
  if (e.target.value.trim() === "") {
    if ($$$("register-fullName").value.trim() === "") {
      focusedField = $$$("register-fullName");
    } else if ($$$("register-email").value.trim() === "") {
      focusedField = $$$("register-email");
    } else if ($$$("register-password").value.trim() === "") {
      focusedField = $$$("register-password");
    }
  } else {
    focusedField = e.target;
  }
});
// dùng input để check rỗng và focus từng trường
$$$("register-fullName").addEventListener("focus", function () {
  if (validateFullname()) {
    focusedField = $$$("register-email");
  } else {
    /**
     * - khi nhập trường fullName đúng sau đó nó sẽ nhảy sang trường Email, nhưng khi quay lại trường fullName
     * nhập sai thì nó vẫn chạy sang trường email mặc dù sai sau đó phải quay lại focus trường fullName thì mới giữ nguyên
     * focus trường fullName
     */
    focusedField = $$$("register-fullName");
  }
});
$$$("register-fullName").addEventListener("input", function () {
  if (validateFullname()) {
    focusedField = $$$("register-email");
  } else {
    focusedField = $$$("register-fullName");
  }
});
$$$("register-email").addEventListener("focus", function () {
  if (validateEmail()) {
    focusedField = $$$("register-password");
  } else {
    focusedField = $$$("register-email");
  }
});
$$$("register-email").addEventListener("input", function () {
  if (validateEmail()) {
    focusedField = $$$("register-password");
  } else {
    focusedField = $$$("register-email");
  }
});
$$$("register-password").addEventListener("focus", function () {
  if (validatePassword()) {
    focusedField = $$$("register-passwordConfirmation");
  } else {
    focusedField = $$$("register-password");
  }
});
$$$("register-password").addEventListener("input", function () {
  if (validatePassword()) {
    focusedField = $$$("register-passwordConfirmation");
  } else {
    focusedField = $$$("register-password");
  }
});
function validateFullname() {
  const fullNameElm = $$$("register-fullName");
  const fullName = fullNameElm.value.trim();

  if (
    isFullNameValid(fullName) &&
    fullName.length > 2 &&
    fullName.length <= 30
  ) {
    return true;
  } else {
    return false;
  }
}
function isFullNameValid(fullName) {
  const regex = /^[a-zA-Z\s]{2,30}/;
  return regex.test(fullName);
}
function validateEmail() {
  const emailElm = $$$("register-email");
  const email = emailElm.value.trim();
  
  if (!email) {
    return false;
  } else if (!isGmailValid(email)) {
    return false;
  }
  
  return true;
}
function isGmailValid(email) {
  const gmailRegex = /^[\w-\.]+@gmail\.com$/;
  return gmailRegex.test(email);
}
function validatePassword() {
  const passwordElm = $$$("register-password");
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
  if (!passwordValue) {
    return false;
  } else if (!(passwordValue.length > 6 && passwordValue.length <= 30)) {
    return false;
  } else if (!/^\d{8}/.test(firstEightChars)) {
    return false;
  } else if (!hasSpecialChar) {
    return false;
  } else if (!hasUpperCase) {
    return false;
  } else if (!hasLowercase) {
    return false;
  } else if (!hasNumber) {
    return false;
  }

  return true;
}
function validateConfirmationPassword() {
  const passwordElm = $$$("register-password");
  const passwordConfirmationElm = $$$("register-passwordConfirmation");

  const passwordValue = passwordElm.value.trim();
  const passwordConfirmationElmValue = passwordConfirmationElm.value.trim();

  // check rỗng
  if (!passwordConfirmationElmValue) {
    return false;
  } else if (!(passwordConfirmationElmValue === passwordValue)) {
    return false;
  } else if (!(passwordConfirmationElmValue.length === passwordValue.length)) {
    return false;
  }

  return true;
}
function showMessageFullName() {
  const fullNameElm = $$$("register-fullName");
  const fullName = fullNameElm.value.trim();

  if (fullName === "") {
    return "Nhập họ tên";
  } else if (fullName.length < 3 || fullName.length > 30) {
    return "Họ tên phải có ít nhất 3 ký tự và tối đa 30 ký tự";
  } else if (!isFullNameValid(fullName)) {
    return "Họ tên chỉ được chứa chữ cái và khoảng trắng";
  }
  return true; // Return an empty string if the full name is valid
}
function showMessageEmail() {
  const emailElm = $$$("register-email");
  const email = emailElm.value.trim();
  if (!email) {
    return "Nhập email";
  } else if (!isGmailValid(email)) {
    return "Email không đúng";
  }

  return true;
}
function showMessagePassword() {
  const passwordElm = $$$("register-password");
  const passwordValue = passwordElm.value.trim();
  // Check first 8 characters are digits
  const firstEightChars = passwordValue.slice(0, 8);
  // Check remaining characters contain at least one special character, one lowercase letter, and one number
  const remainingChars = passwordValue.slice(8);

  // chứa ít nhất 1 ký tự đặc biệt
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(remainingChars);
  // chứa ít nhất 1 ký tự viết hoa
  const hasUpperCase = /[A-Z]/.test(remainingChars);
  // chứa ít nhất 1 ký tự viết thường
  const hasLowercase = /[a-z]/.test(remainingChars);
  // chứa ít nhất 1 chữ số
  const hasNumber = /\d/.test(remainingChars);
  // check rỗng
  if (!passwordValue) {
    return "Chưa nhập mật khẩu";
  } else if (!(passwordValue.length > 6 && passwordValue.length <= 30)) {
    return "Họ tên phải có ít nhất 6 ký tự và tối đa 30 ký tự";
  } else if (!/^\d{8}/.test(firstEightChars)) {
    return "8 ký tự đầu tiên phải là số";
  } else if (!hasSpecialChar) {
    return "Chứa ít nhất 1 ký tự đặc biệt";
  } else if (!hasUpperCase) {
    return "Chứa ít nhất 1 ký tự viết hoa";
  } else if (!hasLowercase) {
    return "Chứa ít nhất 1 ký tự viết thường";
  } else if (!hasNumber) {
    return "Chứa ít nhất 1 chữ số";
  }

  return true;
}
function showMessagePasswordConfirm() {
  const passwordElm = $$$("register-password");
  const passwordValue = passwordElm.value.trim();

  const passwordConfirmationElm = $$$("register-passwordConfirmation");
  const passwordConfirmationElmValue = passwordConfirmationElm.value.trim();
  // khi là chuỗi rỗng thì sẽ k hiện lỗi nhưng nếu không rỗng thì sẽ báo lỗi
  if (
    !(passwordConfirmationElmValue === passwordValue) &&
    !(passwordConfirmationElmValue.length === passwordValue.length)
  ) {
    return "Mật khẩu không khớp.";
  }

  return true;
}
function validateForm() {
  let isvalid = true;
  if (!validateFullname()) {
    isvalid = false;
    // đúng là biến firstInvalidField khác null thì chạy vào thằng đầu tiên, nếu k kiểm tra thì chạy vào thằng cuối cùng.
    if (!firstInvalidField) {
      firstInvalidField = $$$("register-fullName");
    }
  }
  if (!validateEmail()) {
    isvalid = false;
    if (!firstInvalidField) {
      firstInvalidField = $$$("register-email");
    }
  }
  if (!validatePassword()) {
    isvalid = false;
    if (!firstInvalidField) {
      firstInvalidField = $$$("register-password");
    }
  }
  if (!validateConfirmationPassword()) {
    isvalid = false;
    if (!firstInvalidField) {
      firstInvalidField = $$$("register-passwordConfirmation");
    }
  }

  preventSaveEmailDuplicate();

  if (!isvalid) {
    reload();

    showAllMessageSubmit();
    if (focusedField) {
      focusedField.focus();
    } else if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return false;
  }

  if ($('.js-register-show-errors p').innerHTML === 'Email đã tồn tại. Nếu bạn quên mật khẩu, bạn có thể <span class="hover-color-resetPassword">thiết lập lại mật khẩu tại đây.</span>') {
    // email trùng nhau
  } else {
    // email không trùng nhau
    $(".js-register-show-errors").classList.remove("errors");
    $(".js-register-show-errors span").innerText = "";
    $('.js-register-show-errors p').innerHTML = "";
    return true;
  }
}
function showAllMessageSubmit() {
  let errorMessage = "";
  // let isvalid = true;

  if (!validateFullname()) {
    const showErrors = showMessageFullName();
    if (showErrors !== true) {
      errorMessage += showErrors + "<br/>";
    }
  }
  if (!validateEmail()) {
    const showErrors = showMessageEmail();
    if (showErrors !== true) {
      errorMessage += showErrors + "<br/>";
    }
  }
  if (!validatePassword()) {
    const showErrors = showMessagePassword();
    if (showErrors !== true) {
      errorMessage += showErrors + "<br/>";
    }
  }
  if (!validateConfirmationPassword()) {
    const showErrors = showMessagePasswordConfirm();
    if (showErrors !== true) {
      errorMessage += showErrors + "<br/>";
    } 
    // else {
    //   isvalid = true;
    // }
  }

  $(".js-register-show-errors").classList.add("errors");
  $(".js-register-show-errors span").innerHTML = errorMessage;
}
// ngăn chặn lưu email trùng nhau trên localStorage
function preventSaveEmailDuplicate() {
  const fullNameElm = $$$("register-fullName").value.trim();
  const emailElm = $$$("register-email").value.trim();
  const passwordElm = $$$("register-password").value.trim();
  const passwordConfirmationElm = $$$("register-passwordConfirmation").value.trim();

  let getSaveLoginUser = localStorage.getItem("saveLoginUser");
  if (getSaveLoginUser) {
    let converGetSaveLoginUser = JSON.parse(getSaveLoginUser);
    let existingUser = converGetSaveLoginUser.find(
      (user) => user.emailElm.trim() === emailElm
    );

    if (existingUser) {
      if (validateFullname() && validateEmail() && validatePassword() && validateConfirmationPassword()) {
        const email = $$$("register-email").value.trim();
        let getSaveLoginUser = localStorage.getItem("saveLoginUser");
        if (getSaveLoginUser) {
          let converGetSaveLoginUser = JSON.parse(getSaveLoginUser);
          converGetSaveLoginUser.forEach(items => {
            /** những bước cần hiểu và làm theo từng bước
             * B1. Khi nhập trường fullName và email sau đó submit thì đã lưu vào localStorage
             * B2. sau khi nhập fullName và email thì lại nhập password và passwordCofirm sau đó lại submit.
             * B3. lúc này sẽ show lỗi Email đã tồn tại...
             * B4. nên mới cần phải dùng if và else if để check
             * B5. nếu if đầu tiên đúng thì chạy if đầu tiên, else if sẽ chạy sau
             */
            if(items.fullNameElm == "" || items.emailElm == ""|| items.passwordElm == "" || items.passwordConfirmationElm == "") {
              $(".js-register-show-errors").classList.remove("errors-email");
              $(".js-register-show-errors p").innerHTML = '';
            } else if(items.emailElm.trim() === email) {
              $(".js-register-show-errors").classList.add("errors-email");
              $(".js-register-show-errors p").innerHTML = 'Email đã tồn tại. Nếu bạn quên mật khẩu, bạn có thể <span class="hover-color-resetPassword">thiết lập lại mật khẩu tại đây.</span>';
            }
          })
        }
      }

      // Cập nhật đối tượng hiện có ở trong mảng localStorage
      // converGetSaveLoginUser = converGetSaveLoginUser.map((user) =>
        // có thẻ thay thế ...user thành emailElm
      //   user.emailElm.trim() === emailElm
      //     ? { ...user, fullNameElm, passwordElm, passwordConfirmationElm }
      //     : user
      // );

      converGetSaveLoginUser = converGetSaveLoginUser.map((user) => {
        return user.emailElm.trim() === emailElm
          ? { ...user, fullNameElm, passwordElm, passwordConfirmationElm }
          : user;
      });

      localStorage.setItem("saveLoginUser", JSON.stringify(converGetSaveLoginUser));
    } else {
      $(".js-register-show-errors").classList.remove("errors-email");
      $(".js-register-show-errors p").innerHTML = "";
      // Add the new user to the array
      saveLoginUser();
    }
  } else {
    // Create a new array and save the user
    saveLoginUser();
  }
}
// Lưu lên localStorage để khi trường fullName và trường email có giá trị thì khi reload lại website thì nó sẽ vẫn giữ nguyên giá trị
const arrUserLogin = [];
function saveLoginUser() {
  const fullNameElm = $$$("register-fullName").value.trim();
  const emailElm = $$$("register-email").value.trim();
  const passwordElm = $$$("register-password").value.trim();
  const passwordConfirmationElm = $$$(
    "register-passwordConfirmation"
  ).value.trim();

  let objUserLogin = {
    fullNameElm,
    emailElm,
    passwordElm,
    passwordConfirmationElm,
  };

  // nếu không check tất cả rỗng thì sẽ nhận 1 mảng gồm object rỗng và lưu vào localStorage nhìn rất k tốt. vd: [{fullName: ""}]
  if (validateEmail() && validateFullname() || validatePassword() || validateConfirmationPassword()) {
    arrUserLogin.push(objUserLogin);
    localStorage.setItem("saveLoginUser", JSON.stringify(arrUserLogin));
  }
}
function reload() {
  /**
   * - lỗi gặp phải là: khi submit thì sẽ kích hoạt window.reload()
   * sau đó sẽ push vào 1 object mới, nếu có nhập gmail mới thì vẫn không
   * thể push vào array nữa mà chỉ thay thế object mà thôi.
   *
   * - khi fullName và gmail đã nhập đúng thì sẽ không cho focus nữa.
   *
   * - trong hàm checkPasswordAndConfirmErrorResetForm(); thêm arrUserLogin.push(items);
   * thì khi reload thì vẫn lưu object mới vào array.
   */
  if (validateEmail() && validateFullname()) {
    firstInvalidField = null;
    focusedField = null;
    window.location.reload();
  }
}
function checkPasswordAndConfirmErrorResetForm() {
  const fullNameElm = $$$("register-fullName");
  const emailElm = $$$("register-email");

  let getSaveLoginUser = localStorage.getItem("saveLoginUser");
  if (getSaveLoginUser) {
    let converGetSaveLoginUser = JSON.parse(getSaveLoginUser);
    converGetSaveLoginUser.forEach((items, index) => {
      fullNameElm.value = items.fullNameElm;
      emailElm.value = items.emailElm;

      arrUserLogin.push(items);
    });
  }
}
checkPasswordAndConfirmErrorResetForm();
export default $;
