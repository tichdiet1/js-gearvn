import { pageMain, $, $$$ } from "../../store/index.js";
import { arrAccountUserLeft } from "../../store/state.js";

let mapLoopAccountUserLeft = arrAccountUserLeft
  .map((items, index) => {
    let { string } = items;

    let addActive =
      index == 0
        ? "accountUser-left__link accountUser-left__link-hover js-items__converList text-decoration-none px-20px py-12px text-111111 d-flex align-items-center active"
        : index === arrAccountUserLeft.length - 1
        ? "accountUser-left__link accountUser-left__link-hover js-items__logOut text-decoration-none px-20px py-12px text-111111 d-flex align-items-center"
        : "accountUser-left__link accountUser-left__link-hover js-items__converList text-decoration-none px-20px py-12px text-111111 d-flex align-items-center";

    return `
        <li class="accountUser-left__item list-group">
            <a href="" class="${addActive}">${string}</a>
        </li>
    `;
  })
  .join("");
let section = document.createElement("section");
section.setAttribute("class", "section-accountUser");
section.innerHTML = `
    <div class="container">
        <div class="accountUser-group py-4">
            <div class="row">
                <div class="col-3">
                <div class="accountUser-left bg-white rounded-3 shadow-lg h-100">
                    <div class="accountUser-left__top border-bottom">
                        <div class="accountUser-left__content p-3">
                            <div class="accountUser-left__icon d-flex align-items-center">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 0C10.752 0 0 10.752 0 24C0 37.248 10.752 48 24 48C37.248 48 48 37.248 48 24C48 10.752 37.248 0 24 0ZM24 9.6C28.632 9.6 32.4 13.368 32.4 18C32.4 22.632 28.632 26.4 24 26.4C19.368 26.4 15.6 22.632 15.6 18C15.6 13.368 19.368 9.6 24 9.6ZM24 43.2C19.128 43.2 13.368 41.232 9.264 36.288C13.4679 32.9897 18.6567 31.1971 24 31.1971C29.3433 31.1971 34.5321 32.9897 38.736 36.288C34.632 41.232 28.872 43.2 24 43.2Z" fill="#6D6E72"></path>
                                </svg>
                                <span class="fs-18px fw-600 ms-4">khanh truong</span>
                            </div>
                        </div>
                    </div>
                    <div class="accountUser-left__bottom">
                        <ul class="accountUser-left__content pb-20px ps-0">
                            ${mapLoopAccountUserLeft}
                        </ul>
                    </div>
                </div>
                </div>
                <div class="col-9">
                    <div class="accountUser-right bg-white h-100">
                        <div class="js-tab-content rounded-3 shadow-lg active">
                            <div class="accountUser-right__top">
                                <div class="accountUser-right__header py-3 px-4">
                                    <h2 class="mb-0 fs-4 fw-600">Thông tin tài khoản</h2>
                                </div>
                            </div>
                            <div class="accountUser-right__bottom py-3 px-4">
                                <form action="#" id="form-accountUser">
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-fullName text-end">Họ Tên</label>
                                        <input type="text" id="form-fullName" class="border px-3 rounded-1 w-100 ms-32px" />
                                    </div>
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-gender text-end">Giới tính</label>
                                        <div class="form__input-wrapper ms-32px">
                                            <input type="radio" name="gender" value="male" id="radio1" class="border px-3 rounded-1" />
                                            <label for="radio1">Nam</label>
                                            <input type="radio" name="gender" value="female" id="radio2" class="border px-3 rounded-1 ms-12px" />
                                            <label for="radio2">Nữ</label>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-phone text-end">Số điện thoại</label>
                                        <div class="form__input-wrapper ms-32px">
                                            <span>********</span>
                                            <a href="#" class="js-change ms-12px">Thay đổi</a>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-email text-end">Email</label>
                                        <div class="form__input-wrapper ms-32px">
                                            <span>s7*******@gmail.com</span>
                                            <a href="#" class="js-change ms-12px">Thay đổi</a>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-dateOfBirth text-end">Ngày sinh</label>
                                        <div class="form__input-wrapper ms-32px d-flex w-100">
                                            <select id="customer-day" class="form-control textbox border text-535353 me-3" name="day">
                                                <option value="">Ngày</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>
                                            <select id="customer-month" class="form-control textbox me-3" name="month">
                                                <option value="">Tháng</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <select id="customer-year" class="form-control textbox" name="year">
                                                <option value="">Năm</option>
                                                <option value="1910">1910</option>
                                                <option value="1911">1911</option>
                                                <option value="1912">1912</option>
                                                <option value="1913">1913</option>
                                                <option value="1914">1914</option>
                                                <option value="1915">1915</option>
                                                <option value="1916">1916</option>
                                                <option value="1917">1917</option>
                                                <option value="1918">1918</option>
                                                <option value="1919">1919</option>
                                                <option value="1920">1920</option>
                                                <option value="1921">1921</option>
                                                <option value="1922">1922</option>
                                                <option value="1923">1923</option>
                                                <option value="1924">1924</option>
                                                <option value="1925">1925</option>
                                                <option value="1926">1926</option>
                                                <option value="1927">1927</option>
                                                <option value="1928">1928</option>
                                                <option value="1929">1929</option>
                                                <option value="1930">1930</option>
                                                <option value="1931">1931</option>
                                                <option value="1932">1932</option>
                                                <option value="1933">1933</option>
                                                <option value="1934">1934</option>
                                                <option value="1935">1935</option>
                                                <option value="1936">1936</option>
                                                <option value="1937">1937</option>
                                                <option value="1938">1938</option>
                                                <option value="1939">1939</option>
                                                <option value="1940">1940</option>
                                                <option value="1941">1941</option>
                                                <option value="1942">1942</option>
                                                <option value="1943">1943</option>
                                                <option value="1944">1944</option>
                                                <option value="1945">1945</option>
                                                <option value="1946">1946</option>
                                                <option value="1947">1947</option>
                                                <option value="1948">1948</option>
                                                <option value="1949">1949</option>
                                                <option value="1950">1950</option>
                                                <option value="1951">1951</option>
                                                <option value="1952">1952</option>
                                                <option value="1953">1953</option>
                                                <option value="1954">1954</option>
                                                <option value="1955">1955</option>
                                                <option value="1956">1956</option>
                                                <option value="1957">1957</option>
                                                <option value="1958">1958</option>
                                                <option value="1959">1959</option>
                                                <option value="1960">1960</option>
                                                <option value="1961">1961</option>
                                                <option value="1962">1962</option>
                                                <option value="1963">1963</option>
                                                <option value="1964">1964</option>
                                                <option value="1965">1965</option>
                                                <option value="1966">1966</option>
                                                <option value="1967">1967</option>
                                                <option value="1968">1968</option>
                                                <option value="1969">1969</option>
                                                <option value="1970">1970</option>
                                                <option value="1971">1971</option>
                                                <option value="1972">1972</option>
                                                <option value="1973">1973</option>
                                                <option value="1974">1974</option>
                                                <option value="1975">1975</option>
                                                <option value="1976">1976</option>
                                                <option value="1977">1977</option>
                                                <option value="1978">1978</option>
                                                <option value="1979">1979</option>
                                                <option value="1980">1980</option>
                                                <option value="1981">1981</option>
                                                <option value="1982">1982</option>
                                                <option value="1983">1983</option>
                                                <option value="1984">1984</option>
                                                <option value="1985">1985</option>
                                                <option value="1986">1986</option>
                                                <option value="1987">1987</option>
                                                <option value="1988">1988</option>
                                                <option value="1989">1989</option>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1992">1992</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                                <option value="2002">2002</option>
                                                <option value="2003">2003</option>
                                                <option value="2004">2004</option>
                                                <option value="2005">2005</option>
                                                <option value="2006">2006</option>
                                                <option value="2007">2007</option>
                                                <option value="2008">2008</option>
                                                <option value="2009">2009</option>
                                                <option value="2010">2010</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3 d-flex align-items-center">
                                        <label class="label-button text-end"></label>
                                        <div class="form__input-wrapper ms-32px">
                                            <button class="btn-saveChange border bg-E30019 rounded-2 text-white">Lưu thay đổi</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="js-tab-content bg-white rounded-3 shadow-lg">
                            <div class="accountUser-right__top">
                                <div class="accountUser-right__header">
                                    <div class="tab-content">
                                        <div class="tab-content__wrap py-3 px-4 d-flex align-items-center justify-content-between">
                                            <div class="accountUser-right__title">
                                                <h2 class="mb-0 fs-4 fw-600">Thông tin tài khoản</h2>
                                            </div>
                                            <button class="add-new-address lh-1 text-white fw-500 px-2 py-12px bg-005EC9 border border-0 rounded-1">+ Thêm địa chỉ mới</button>
                                        </div>
                                    </div>
                                    <div class="box-info-account px-4 py-3">
                                        <div class="box-info__wrap">
                                            <div class="view_address d-flex align-items-center justify-content-between border-top py-20px">
                                                <div class=""view_address__wrap">
                                                    <p class="mb-2 d-flex align-items-center">
                                                        <span class="default_address border d-inline-block rounded-1 me-2 d-flex align-items-center justify-content-center fs-14px fw-400">Mặc định</span>
                                                        <span class="fs-14px fw-600 text-111111">khanh truong</span>
                                                    </p>
                                                    <div class="view_address-text">
                                                        <p class="name_address text-535353 fs-14px fw-500 mb-2">Vietnam</p>
                                                    </div>
                                                </div>
                                                <button class="btn-reset fw-500">
                                                    <a href="#" class="fs-14px fw-400 text-decoration-none text-0568d6">Cập nhật</a>
                                                </button>
                                            </div>
                                            <div class="view_address d-flex align-items-center justify-content-between border-top py-20px">
                                                <div class=""view_address__wrap">
                                                    <p class="mb-2 d-flex align-items-center">
                                                        <span class="name_address fs-14px fw-600 pe-2">truong vu cong khanh</span>
                                                        <span class="phone_address position-relative fs-14px fw-400 text-535353 ps-2">0969267071</span>
                                                    </p>
                                                    <div class="view_address-text">
                                                        <p class="text-535353 fs-14px fw-500 mb-2">257/20, Phường Phú Thạnh, Quận Tân Phú, Hồ Chí Minh, Vietnam</p>
                                                    </div>
                                                </div>
                                                <div class="colleft">
                                                    <div class="address_actions">
                                                        <div class="address_actions-top d-flex align-items-center justify-content-end mb-2">
                                                            <span>
                                                                <a href="#" class="fs-14px fw-400 text-decoration-none text-0568d6 fw-500">Cập nhật</a>
                                                            </span>
                                                            <span class="ms-3">
                                                                <a href="#" class="fs-14px fw-400 text-decoration-none text-0568d6 fw-500">Xóa</a>
                                                            </span>
                                                        </div>
                                                        <span class="action_setup_df border px-10px py-3px rounded-1 d-inline-block">
                                                            <a href="" class="text-decoration-none text-111111 fs-14px fw-400">Thiết lập mặc định</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="view_address d-flex align-items-center justify-content-between border-top py-20px">
                                                <div class=""view_address__wrap">
                                                </div>
                                                <div class="colleft">
                                                    <div class="address_actions">
                                                        <div class="address_actions-top d-flex align-items-center justify-content-end mb-2">
                                                            <span>
                                                                <a href="#" class="fs-14px fw-400 text-decoration-none text-0568d6 fw-500">Cập nhật</a>
                                                            </span>
                                                            <span class="ms-3">
                                                                <a href="#" class="fs-14px fw-400 text-decoration-none text-0568d6 fw-500">Xóa</a>
                                                            </span>
                                                        </div>
                                                        <span class="action_setup_df border px-10px py-3px rounded-1 d-inline-block">
                                                            <a href="" class="text-decoration-none text-111111 fs-14px fw-400">Thiết lập mặc định</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="js-tab-content bg-white">
                            <div class="orderManagement__heading">
                                <div class="orderManagement__heading-title py-3 px-4">
                                    <h2 class="fs-4 fw-600">Quản lý đơn hàng</h2>
                                </div>
                            </div>
                            <div class="box-info-account pb-4">
                                <div class="box-info__nav">
                                    <ul class="box-info__list ps-0 mb-0 d-flex align-items-center justify-content-between">
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap active">TẤT CẢ</li>
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap">MỚI</li>
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap">ĐANG XỬ LÝ</li>
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap">ĐANG VẬN CHUYỂN</li>
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap">HOÀN THÀNH</li>
                                        <li class="box-info__item box-info__item--js position-relative list-group fs-6 fw-500 text-535353 ps-1 pb-2 flex-grow-1 text-center text-nowrap">HUỶ</li>
                                    </ul>
                                </div>
                                <div class="history-search py-3 bg-ececec">
                                    <div class="history-search__wrap position-relative d-flex align-items-center justify-content-between border border-1 bg-white">
                                        <div class="search-group d-flex align-items-center flex-grow-1">
                                            <span class="position-absolute lh-0">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6D6E72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M14.0001 13.9996L11.1001 11.0996" stroke="#6D6E72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                            <input type="text" class="form-control ps-38px pe-3 py-0" id="search-order__input" placeholder="Tìm đơn hàng theo Mã đơn hàng">
                                        </div>
                                        <div class="btn-history-search position-relative d-flex align-items-center">
                                            <div class="line"></div>
                                            <button type="submit" class="btn text-1982F9 px-3">Tìm đơn hàng</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="history-table">
                                    <div class="data-account__empty mt-32px text-center">
                                        <div class="icon-empty">
                                            <svg width="132" height="170" viewBox="0 0 132 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6133_13905)"><path d="M125.486 120.371H113.585V91.6562H132V113.845C132 117.451 129.086 120.371 125.486 120.371Z" fill="#A1AAAF"></path><path d="M99.3294 167.226C95.6392 170.922 89.6482 170.922 85.949 167.226L50.2828 131.497C46.5926 127.801 46.5926 121.799 50.2828 118.094C53.973 114.397 59.964 114.397 63.6633 118.094L99.3294 153.822C103.029 157.528 103.029 163.529 99.3294 167.226Z" fill="#E1E4E6"></path><path d="M128.553 117.208C126.649 117.208 125.107 115.662 125.107 113.755V91.9459C125.107 91.8465 125.125 91.7561 125.134 91.6567H125.107V6.06465C125.107 2.72051 122.4 0 119.052 0H42.7036C39.3652 0 36.6494 2.71147 36.6494 6.06465V114.315C36.6494 117.66 39.3562 120.38 42.7036 120.38H113.585H125.107H125.486C129.086 120.38 132 117.461 132 113.855V113.764C132 115.662 130.457 117.208 128.553 117.208Z" fill="#E1E4E6"></path><path d="M40.1233 148.932C62.2828 148.932 80.2466 130.937 80.2466 108.739C80.2466 86.5409 62.2828 68.5459 40.1233 68.5459C17.9638 68.5459 0 86.5409 0 108.739C0 130.937 17.9638 148.932 40.1233 148.932Z" fill="#CBD1D6"></path><path d="M40.1235 136.577C55.4712 136.577 67.9129 124.113 67.9129 108.739C67.9129 93.3647 55.4712 80.9014 40.1235 80.9014C24.7758 80.9014 12.334 93.3647 12.334 108.739C12.334 124.113 24.7758 136.577 40.1235 136.577Z" fill="white"></path><path d="M51.6001 97.2418C52.9084 98.5524 52.9084 100.676 51.6001 101.987L33.3836 120.226C32.0753 121.537 29.955 121.537 28.6467 120.226C27.3385 118.916 27.3385 116.792 28.6467 115.481L46.8633 97.2328C48.1715 95.9313 50.2918 95.9313 51.6001 97.2418Z" fill="#F56F65"></path><path d="M51.6001 120.226C50.2918 121.537 48.1715 121.537 46.8633 120.226L28.6467 101.978C27.3385 100.667 27.3385 98.5435 28.6467 97.2329C29.955 95.9224 32.0753 95.9224 33.3836 97.2329L51.6001 115.481C52.9084 116.792 52.9084 118.925 51.6001 120.226Z" fill="#F56F65"></path><path d="M55.9488 25.7136C59.7112 25.7136 63.3112 22.4056 63.1398 18.5101C62.9684 14.6056 59.9819 11.3066 55.9488 11.3066C52.1864 11.3066 48.5864 14.6146 48.7578 18.5101C48.9293 22.4146 51.9157 25.7136 55.9488 25.7136Z" fill="white"></path><path d="M80.1925 25.7136C83.9549 25.7136 87.5549 22.4056 87.3834 18.5101C87.212 14.6056 84.2255 11.3066 80.1925 11.3066C76.4301 11.3066 72.8301 14.6146 73.0015 18.5101C73.1819 22.4146 76.1684 25.7136 80.1925 25.7136Z" fill="white"></path><path d="M104.445 25.7136C108.207 25.7136 111.807 22.4056 111.636 18.5101C111.464 14.6056 108.478 11.3066 104.445 11.3066C100.683 11.3066 97.0825 14.6146 97.2539 18.5101C97.4344 22.4146 100.421 25.7136 104.445 25.7136Z" fill="white"></path><path d="M108.28 44.9557H51.1307C49.678 44.9557 48.4961 43.7717 48.4961 42.3165V40.8071C48.4961 39.352 49.678 38.168 51.1307 38.168H108.28C109.732 38.168 110.914 39.352 110.914 40.8071V42.3165C110.914 43.7717 109.732 44.9557 108.28 44.9557Z" fill="white"></path><path d="M108.343 61.6042H51.0585C49.642 61.6042 48.4961 60.4563 48.4961 59.0373V57.7358C48.4961 56.3168 49.642 55.1689 51.0585 55.1689H108.343C109.759 55.1689 110.905 56.3168 110.905 57.7358V59.0373C110.914 60.4473 109.759 61.6042 108.343 61.6042Z" fill="white"></path></g><defs><clipPath id="clip0_6133_13905"><rect width="132" height="170" fill="white"></rect></clipPath></defs></svg>
                                        </div>
                                        <p class="alert-empty my-3 fs-6 fw-400 text-center">Quý khách chưa có đơn hàng nào.</p>
                                    </div>
                                </div>
                                <div class="continue-shopping text-center">
                                    <button type="submit" class="btn text-1982F9 px-3 bg-E30019 text-white px-28px py-10px fw-500">TIẾP TỤC MUA HÀNG</button>
                                </div>
                            </div>
                        </div>
                        <div class="js-tab-content bg-white">
                            <div class="customers-viewed box-heading">
                                <div class="customers-viewed__wrap">
                                    <div class="box-title px-4 py-3">
                                        <h2 class="mb-0 fs-4 fw-600">SẢN PHẨM ĐÃ XEM</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="viewedlist-account">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="product-proloop">
                                            <div class="product-proloop-block">
                                                <div class="proloop-img p-3">
                                                    <img src="/DAJS/src/assets/product/product-slider-img/id-1-product-slider-image-1.webp" alt="" class="w-100 h-100" />
                                                </div>
                                                <div class="proloop-detail px-3 pb-3 pt-6px">
                                                    <h3 class="mb-10px">
                                                        <a href="" class="text-decoration-none text-333333 lh-base fs-14px fw-600">Màn hình Viewsonic VA2732-H-W 27" IPS 100Hz viền mỏng</a>
                                                    </h3>
                                                    <div class="proloop-price">
                                                        <div class="proloop-price--compare text-6D6E72 fs-13px fw-500">
                                                            <del>3.190.000₫</del>
                                                        </div>
                                                        <div class="proloop-price--default">
                                                            <span class="viewedlist-price--highlight fs-6 fw-600 text-E30019">2.790.000₫</span>
                                                            <span class="viewedlist--on-sale px-1 lh-sm d-inline-block bg-FFEDED color-E30019 fs-13px fw-400 border border-1 ms-10px">-12%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
let main = document.querySelector("main");
main.append(section);
export default $;
