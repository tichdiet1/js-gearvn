import { $, $$, $$$ } from "../../../store/index.js";

// khởi tạo div mới
let divElm = document.createElement("div");
let classDivElm = document.createAttribute("class"); // class
classDivElm.nodeValue =
  "register-coating js-click-register-coating-show bg-rgba00003 position-fixed inset-0 z-index106";
divElm.setAttributeNode(classDivElm); // <div class="coating-login-register"></div>
divElm.innerHTML = `
    <div class="account-container js-click-register-conten-show position-absolute start-50 bg-white rounded-4">
        <div class="register-wrap">
            <div class="register-heading border-bottom">
                <div class="register-heading__content d-flex align-items-center justify-content-between p-4">
                    <h4 class="register-heading__title fs-6 fw-500 mb-0">ĐĂNG KÝ TÀI KHOẢN GEARVN</h4>
                    <button type="button" class="btn-register-close js-btn-register-close border-0 bg-white p-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99586 8L15.5824 2.41348C15.8475 2.14881 15.9967 1.78966 15.997 1.41503C15.9973 1.0404 15.8488 0.680986 15.5841 0.415851C15.3195 0.150716 14.9603 0.00157854 14.5857 0.0012477C14.2111 0.000916852 13.8517 0.14942 13.5865 0.414087L8 6.00061L2.41348 0.414087C2.14834 0.148952 1.78874 0 1.41378 0C1.03882 0 0.679222 0.148952 0.414087 0.414087C0.148952 0.679222 0 1.03882 0 1.41378C0 1.78874 0.148952 2.14834 0.414087 2.41348L6.00061 8L0.414087 13.5865C0.148952 13.8517 0 14.2113 0 14.5862C0 14.9612 0.148952 15.3208 0.414087 15.5859C0.679222 15.851 1.03882 16 1.41378 16C1.78874 16 2.14834 15.851 2.41348 15.5859L8 9.99939L13.5865 15.5859C13.8517 15.851 14.2113 16 14.5862 16C14.9612 16 15.3208 15.851 15.5859 15.5859C15.851 15.3208 16 14.9612 16 14.5862C16 14.2113 15.851 13.8517 15.5859 13.5865L9.99586 8Z" fill="#6D6E72"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="register-body p-4">
                <div class="js-register-show-errors">
                    <span></span>
                    <p class="mb-0"></p>
                </div>
                <form class="register-body__content pb-3" id="form-register" novalidate>
                    <div class="register-body__wrap position-relative mb-3">
                        <input type="text" id="register-fullName" placeholder="" class="focus-input-account px-3 fs-6 w-100 h-100 rounded-1" autocomplete="off" />
                        <label for="register-fullName" class="input-label-account position-absolute fw-400 text-535353">Họ tên</label>
                    </div>
                    <div class="register-body__wrap position-relative mb-3">
                        <input type="email" id="register-email" placeholder="" class="focus-input-account px-3 fs-6 w-100 h-100 rounded-1" autocomplete="off" />
                        <label for="register-email" class="input-label-account position-absolute fw-400 text-535353">Email</label>
                    </div>
                    <div class="register-body__wrap position-relative mb-3">
                        <input type="text" id="register-password" placeholder="" class="focus-input-account px-3 fs-6 w-100 h-100 rounded-1" autocomplete="off" />
                        <label for="register-password" class="input-label-account position-absolute fw-400 text-535353">Mật khẩu</label>
                    </div>
                    <div class="register-body__wrap position-relative mb-3">
                        <input type="text" id="register-passwordConfirmation" placeholder="" class="focus-input-account px-3 fs-6 w-100 h-100 rounded-1" autocomplete="off" />
                        <label for="register-passwordConfirmation" class="input-label-account position-absolute fw-400 text-535353">Mật khẩu</label>
                    </div>
                    <div class="customer-checkbox mb-3">
                        <div class="customer-checkbox-content">
                            <input type="checkbox" id="customer-checkbox-input" class="customer-checkbox-input" checked />
                            <label for="customer-checkbox-input" class="fs-6 fw-400 text-111">Đăng ký nhận tin khuyến mãi qua Email</label>
                        </div>
                    </div>
                    <button class="btn-register-submit border border-0 bg-E30019 rounded-1 px-12px text-white fs-6 fw-600 w-100 text-uppercase">tạo tài khoản</button>
                </form>
                <div class="form-btn-social mb-4">
                    <div class="line-content">
                        <div class="login-line position-relative my-33px">
                            <span class="login-line-text text-535353 position-absolute start-50 top-50 translate-middle fs-6 fw-400 bg-white px-2">hoặc đăng nhập bằng</span>
                        </div>
                    </div>
                    <div class="btn-social-wrap">
                        <div class="btn-social-list d-flex align-items-center justify-content-between">
                            <button class="border-0 px-28px py-10px h-100 flex-1 d-flex align-items-center justify-content-center bg-DF4A32 rounded-1" id="btn-google-login">
                                <svg width="36" height="36" class="me-2" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.96 16.5599V20.0159H18.648C18.432 21.5279 16.92 24.3359 12.96 24.3359C9.504 24.3359 6.69601 21.4559 6.69601 17.9999C6.69601 14.5439 9.504 11.6639 12.96 11.6639C14.904 11.6639 16.2 12.5279 16.992 13.2479L19.728 10.5839C17.928 8.92792 15.696 7.91992 12.96 7.91992C7.41601 7.91992 2.88 12.4559 2.88 17.9999C2.88 23.5439 7.41601 28.0799 12.96 28.0799C18.792 28.0799 22.608 23.9759 22.608 18.2159C22.608 17.5679 22.536 17.0639 22.464 16.5599H12.96ZM34.56 16.5599H31.68V13.6799H28.8V16.5599H25.92V19.4399H28.8V22.3199H31.68V19.4399H34.56V16.5599Z" fill="white"></path>
                                </svg>
                                <span class="fs-14px fw-500 text-white">Google</span>
                            </button>
                            <button class="border-0 px-28px py-10px h-100 flex-1 d-flex align-items-center justify-content-center bg-3B5998 rounded-1 ms-2" id="btn-facebook-login">
                                <svg width="24" height="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.198 21.5H13.198V13.49H16.802L17.198 9.51H13.198V7.5C13.198 7.23478 13.3034 6.98043 13.4909 6.79289C13.6784 6.60536 13.9328 6.5 14.198 6.5H17.198V2.5H14.198C12.8719 2.5 11.6002 3.02678 10.6625 3.96447C9.72479 4.90215 9.198 6.17392 9.198 7.5V9.51H7.198L6.802 13.49H9.198V21.5Z" fill="white"></path>
                                </svg>
                                <span class="fs-14px fw-500 text-white">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-btn-bottom text-center">
                    <span class="text-535353">Bạn chưa có tài khoản?</span>
                    <a href="" class="btn-link-login text-decoration-none fs-6 fw-400 text-1982F9">Đăng nhập!</a>
                </div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(divElm);
export default $;
