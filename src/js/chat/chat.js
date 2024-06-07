import { pageMain , $, $$, $$$ } from '../../store/index.js';
import { clearChatHours, handleTime } from './timeSendMessage.js';
const arrQuickreps = pageMain.arrQuickreps;

let timeoutId; // Biến để lưu tham chiếu đến hàm setTimeout
let timeOutAI; // Biến để lưu tham chiếu đến hàm setTimeout
let inputData = document.getElementById('message-input');
function newSendChat(svgStarLikeStaff) {
    let inputValue = inputData.value;
    let div = document.createElement('div');
    div.setAttribute('class','user-chat position-relative text-end pe-3');
    // ${ inputValue || clickSupport } clickSupport là sai, nếu muốn sài được thì phải xóa clickSupport thì bên starLikeStaff mới chạy được
    div.innerHTML = `<p class="mb-0 fs-13px fw-400 d-inline-block px-20px py-10px my-2 bg-2392740 text-white rounded-3 text-break mw-187px">${ inputValue || svgStarLikeStaff }</p>`
    $('.box-chat').appendChild(div);
    // reset value textarea khi người dùng bấm vào nút gửi
    inputData.value = ""; // hoặc inputData.value = inputData.placeholder; // cách inputData.placeholder thì lấy luôn value hiển thị ra bên ngoài
    // xóa icon gửi sau khi bấm gửi
    $('.chat--footer-icons').classList.remove('user-chat');
    // khi user gửi tin nhắn thì thằng này được gọi
    handleUserSendMessage();
    clearTimeout(timeOutAI);
}
function handleUserSendMessage() {
    $('.dropdown-icon-bars').classList.add('d-none');
}
function checkAISendMessage() {
    // AI gửi tin nhắn tự động
    let currentHour = new Date().getHours(); // check theo mũi giờ
    // nếu từ 21h đến 8h sáng thì gửi tin nhắn không hoạt động, ngược lại thì gửi GEARVN xin kính chào!
    // if (currentHour >= 23 || currentHour < 8)
    if (currentHour >= 11 || currentHour < 5) {
        sendMessage('GEARVN xin kính chào! Thời gian hỗ trợ, tư vấn, trả lời từ 8h-21h hàng ngày. Hãy gửi cho chúng tôi mọi câu hỏi của Quý khách. Trân trọng!'); // Gửi tin nhắn cố định
        // để if else đều có returnListSelectAI(); click lần đầu tiên thì nhận nhưng khi người dùng gửi tin nhắn rồi bấm gửi thì lại không nhận nữa
        returnListSelectAI();
        sendMessage('Quý khách vui lòng chờ trong giây lát, tin nhắn đang được chuyển đến nhân viên.'); // Gửi tin nhắn cố định
        resetTimeOut();
        scrollEndOfPage();
    } else {
        // để if else đều có returnListSelectAI(); click lần đầu tiên thì nhận nhưng khi người dùng gửi tin nhắn rồi bấm gửi thì lại không nhận nữa
        returnListSelectAI();

        sendMessage("Hiện tại không hoạt động. Vui lòng liên hệ trong khoảng thời gian từ 8h sáng đến 21h.");
    }
}
export function resetTimeOut() {
    clearTimeout(timeOutAI); // Clear any existing timeOutAI
    timeOutAI = setTimeout(() => {
      // Your code to execute after the specified delay
      $('.chat--footer-icons').classList.add('staff-chat');
      sendMessage('Dạ chào anh/chị, em có thể hỗ trợ được gì cho mình ạ'); // Gửi tin nhắn cố định 
      $('.userSend-item:nth-of-type(7)').classList.remove('d-none');
      clearChatHours();
      scrollEndOfPage();
    }, 5000);
}
export function clearAllTimeOut() {
    clearTimeout(timeOutAI);
    clearTimeout(timeoutId);
}
// để if else đều có returnListSelectAI(); click lần đầu tiên thì nhận nhưng khi người dùng gửi tin nhắn rồi bấm gửi thì lại không nhận nữa
function returnListSelectAI() {
    // sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ'); // Gửi tin nhắn cố định
    // Thêm thẻ div sau tin nhắn "GEARVN xin kính chào!"
    let additionalDiv = document.createElement('div');
    additionalDiv.setAttribute('class', 'box-chat__select mb-2');
    additionalDiv.innerHTML = `
        <nav class="cursor-pointer user-select-none">
            <ul class="list-select-wrap ps-0 mb-0 d-inline-block rounded-1 ms-3 border text-center">
                <li class="list-select-AI help-center hover-list-select-AI list-group px-3 py-2 border-bottom rounded-initial">
                    <span class="fs-14px fw-400 text-333333">Trung tâm trợ giúp</span>
                </li>
                <li class="list-select-AI shopping-consulting hover-list-select-AI list-group px-3 py-2 border-bottom rounded-initial">
                    <span class="fs-14px fw-400 text-333333">Tư vấn mua hàng</span>
                </li>
                <li class="list-select-AI Look-up-warranty hover-list-select-AI list-group px-3 py-2 border-bottom rounded-initial">
                    <span class="fs-14px fw-400 text-333333">Tra cứu bảo hành</span>
                </li>
                <li class="list-select-AI technical-assistance hover-list-select-AI list-group px-3 py-2 border-bottom rounded-initial">
                    <span class="fs-14px fw-400 text-333333">Hỗ trợ kỹ thuật</span>
                </li>
            </ul>
        </nav>
    `;

    // lỗi này khá khó và đáng để nghiên cứu: lưu trữ tin nhắn, đã fix

    // Xóa sự kiện click cũ, bị lưu trữ tin nhắn, khi người dùng gửi tin nhắn sau đó click vào trung tâm thì nó sẽ lưu tin nhắn cho đợt sau, đợt sau gửi tiếp nó lại lôi tin nhắn cũ ra gửi tiếp
    // cách giải quyết lưu trữ tin nhắn
    // const boxChat = document.querySelector('.box-chat');
    // boxChat.removeEventListener('click', handleClick);

    $('.box-chat').appendChild(additionalDiv);
    
    // Gắn sự kiện click vào additionalDiv. Cách giải quyết lưu trữ tin nhắn
    additionalDiv.addEventListener('click', handleClickAdditionalDiv);
}
// ----------------large => medium-------------------
export const menuItemMap = {
    'Trung tâm trợ giúp': createQuickReps,
    'Tư vấn mua hàng': createShoppingConsulting,
    'Tra cứu bảo hành': createLookUpWarranty,
    'Hỗ trợ kỹ thuật': createTechnicalAssistance,
};
function handleClickAdditionalDiv(e) {
    const target = e.target;
    const menuItemText = target.innerText;

    if (menuItemText in menuItemMap) {
        const menuItemFunction = menuItemMap[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}
// --------------large => medium => small--------------
export const menuQuickreps = {
    'Mua hàng cùng GearVN': createlabelMediumHelpCenter,
    'Chính sách bảo hành': createlabelMediumPolicy,
    'Hướng dẫn thanh toán': createlabelMediumPaymentGuide,
    'Mua hàng trả góp': createlabelMediumPurchase,
    'Trả hàng': createlabelMediumReturns,
    'Hoàn tiền': createlabelMediumRefund,
    'Đơn hàng/Vận chuyển': createlabelMediumOrderTransport,
    'Các kênh hỗ trợ': createlabelMediumSupportChannels,
    'Quay lại': createlabelMediumComeBack,
};
  
function handleClickQuickreps(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuQuickreps) {
        const menuItemFunction = menuQuickreps[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
} 
// -----------------------------------------------

// ----------------------large => medium => small => smallest-------------------------
/**
 * 1: lấy ra sự kiện click do người dùng chọn.
 * 2: lấy ra dữ liệu của lập trình viên xét sẵn là Mua online thế nào?.
 * 3: lấy 1 và 2 so sánh với nhau. (nếu bằng nhau thì chấp nhận if(true)).
 */
const menuSmallest = {
    'Mua online thế nào?': smallestHelpCenterBuyOnline,
    'Điều kiện xuất VAT': smallestHelpCenterCondition,
    'Điều kiện bảo hành': smallestHelpCenterWarrantyConditions,
    'Hình thức bảo hành': smallestHelpCenterFormOfWarranty,
    'Thời gian bảo hành': smallestHelpCenterWarrantyPeriod,
    'Phí bảo hành thế nào?': smallestHelpCenterWarrantyExpenses,
    'Đổi trả thế nào?': smallestHelpCenterChangePay,
    'Quay lại': smallestHelpCenterComeBack,
};
function handleClickSmallest(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallest) {
        const menuItemFunction = menuSmallest[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestPolicy = {
    'Điều kiện bảo hành': smallestPolicyWarrantyConditions,
    'Hình thức bảo hành': smallestPolicyFormOfWarranty,
    'Thời gian bảo hành': smallestPolicyWarrantyPeriod,
    'Phí bảo hành thế nào': smallestPolicyWarrantyExpenses,
    'Thu hồi đổi mới': smallestPolicyInnovationWithdrawal,
    'Quay lại': smallestPolicyComeBack,
};
function handleClickSmallestPolicy(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestPolicy) {
        const menuItemFunction = menuSmallestPolicy[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestPay = {
    'Các phương thức': smallestPayMethods,
    'COD là gì': smallestPayCOD,
    'Quay lại': smallestPayComeBack,
};
function handleClickSmallestPay(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestPay) {
        const menuItemFunction = menuSmallestPay[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestPurchase = {
    'Lãi suất': smallestPurchaseInterest,
    'Trả góp qua đâu?': smallestPurchaseInstallment,
    'Điều kiện trả góp': smallestPurchaseInstallmentTerms,
    'Hình thức đăng ký': smallestPurchaseRegistrationForm,
    'Ngân hàng trả góp': smallestPurchaseInstallmentBank,
    'Kỳ hạn trả góp': smallestPurchaseinstallmentPeriod,
    'Có trả góp online?': smallestPurchaseAvailableInInstallments,
    'Góp nhiều sản phẩm?': smallestPurchaseContributeManyProducts,
    'Quay lại': smallestPurchaseComeBack,
};
function handleClickSmallestPurchase(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestPurchase) {
        const menuItemFunction = menuSmallestPurchase[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestReturns = {
    'Hình thức đổi hàng': smallestReturnsFormOfExchange,
    'Điều kiện đổi hàng': smallestReturnsConditionsOfExchange,
    'Giao sai sản phẩm': smallestReturnsWrongProductDelivered,
    'Giao thiếu sản phẩm': smallestReturnsMissingProductDelivered,
    'Hàng bị lỗi': smallestReturnsDefectiveGoods,
    'Quay lại': smallestReturnsComeBack,
};
function handleClickSmallestReturns(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestReturns) {
        const menuItemFunction = menuSmallestReturns[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestRefund = {
    'Hình thức hoàn tiền': smallestRefundForm,
    'Điều kiện hoàn tiền': smallestRefundConditions,
    'Thời gian hoàn tiền': smallestRefundTime,
    'Quay lại': smallestRefundComeBack,
};
function handleClickSmallestRefund(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestRefund) {
        const menuItemFunction = menuSmallestRefund[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestOrderTransport = {
    'Sửa địa chỉ nhận': smallestOrderTransportEditReceivingAddress,
    'Trạng thái giao hàng': smallestOrderTransportDeliveryStatus,
    'Phí vận chuyển': smallestOrderTransportTransportFee,
    'Miễn phí giao hàng': smallestOrderTransportFreeShip,
    'Có giao hỏa tốc?': smallestOrderTransportExpressDelivery,
    'Quay lại': smallestOrderTransportComeBack,
};
function handleClickSmallestOrderTransport(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestOrderTransport) {
        const menuItemFunction = menuSmallestOrderTransport[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestSupportChannel = {
    'Sửa địa chỉ nhận': smallestSupportChannelEditShippingAddress,
    'Trạng thái giao hàng': smallestSupportChannelDeliveryStatus,
    'Phí vận chuyển': smallestSupportChannelTransportFee,
    'Miễn phí giao hàng': smallestSupportChannelFreeShip,
    'Có giao hỏa tốc?': smallestSupportChannelExpressDelivery,
    'Quay lại': smallestSupportChannelComeBack,
};
function handleClickSmallestSupportChannel(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestSupportChannel) {
        const menuItemFunction = menuSmallestSupportChannel[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}

const menuSmallestAndSmall = {
    'Quay lại': handleClickSmallestAndSmallBuyOnline,
};
function handleSmallestAndSmall(e) {
    const target = e.target;
    const menuItemText = target.innerText;
    
    if (menuItemText in menuSmallestAndSmall) {
        const menuItemFunction = menuSmallestAndSmall[menuItemText];
        menuItemFunction(menuItemText);
        clearChatHours();
    }
    
    clearTimeoutChat();
    // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
    scrollEndOfPage();
}
// -----------------------------------------------

// -----------------large => medium------------------
export function createQuickReps(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);
    
    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    quickreps.addEventListener('click', handleClickQuickreps);
}
export function createShoppingConsulting(clickSupport) {
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    let currentHour = new Date().getHours();
    if(currentHour >= 21 || currentHour < 5) {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Quý khách vui lòng chờ trong giây lát, tin nhắn đang được chuyển đến nhân viên.')
    } else {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Hiện tại nhân viên hỗ trợ không sẵn sàng. Thời gian làm việc của chúng tôi từ 08:00 đến 21:00 tất cả các ngày trong tuần, hãy để lại lời nhắn kèm số điện thoại. GEARVN sẽ liên hệ với bạn trong thời gian sớm nhất. Xin chân thành cảm ơn!');
    }
}
export function createLookUpWarranty(clickSupport) {
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="mb-0 fs-13px fw-400 d-inline-block px-20px py-10px mb-2 bg-2392740 text-white rounded-3 text-break mw-187px text-nowrap">${clickSupport}</p>`;
    let currentHour = new Date().getHours();
    if(currentHour >= 21 || currentHour < 5) {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Quý khách vui lòng chờ trong giây lát, tin nhắn đang được chuyển đến nhân viên.')
    } else {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Hiện tại nhân viên hỗ trợ không sẵn sàng. Thời gian làm việc của chúng tôi từ 08:00 đến 21:00 tất cả các ngày trong tuần, hãy để lại lời nhắn kèm số điện thoại. GEARVN sẽ liên hệ với bạn trong thời gian sớm nhất. Xin chân thành cảm ơn!');
    }
}
export function createTechnicalAssistance(clickSupport) {
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    let currentHour = new Date().getHours();
    if(currentHour >= 21 || currentHour < 5) {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Quý khách vui lòng chờ trong giây lát, tin nhắn đang được chuyển đến nhân viên.')
    } else {
         // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
        $('.box-chat').append(div);
        sendMessage('Hiện tại nhân viên hỗ trợ không sẵn sàng. Thời gian làm việc của chúng tôi từ 08:00 đến 21:00 tất cả các ngày trong tuần, hãy để lại lời nhắn kèm số điện thoại. GEARVN sẽ liên hệ với bạn trong thời gian sớm nhất. Xin chân thành cảm ơn!');
    }
}
// -----------------------------------

// ---------------large => medium => small--------------------
export function createlabelMediumHelpCenter(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[0].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);
    // click vào mua hàng online thì xuất ra smallest
    
    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // $('.userSend-item:nth-of-type(7)').classList.remove('d-none');
    quickreps.addEventListener('click', handleClickSmallest);
}
function createlabelMediumPolicy(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[1].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào chính sách bảo hành thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestPolicy);
}
function createlabelMediumPaymentGuide(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[2].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các phương thức thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestPay);
}
function createlabelMediumPurchase(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[3].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các mua hàng trả góp thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestPurchase);
}
function createlabelMediumReturns(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[4].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các mua hàng trả góp thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestReturns);
}
function createlabelMediumRefund(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[5].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các mua hàng hoàn tiền thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestRefund);
}
function createlabelMediumOrderTransport(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[6].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các mua hàng Đơn hàng/Vận chuyển thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestOrderTransport);
}
function createlabelMediumSupportChannels(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');

    const mapSmall = arrQuickreps[7].small.map(items => {
        let { smallTitle } = items;

        return `
            <div class="quickreps-item position-relative">
                <p class="quickreps-text mb-0 fs-12px fw-400">${ smallTitle }</p>
                <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ smallTitle }</span>
            </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapSmall }
      </div>
    `;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // click vào các kênh hỗ trợ thì xuất ra smallest
    quickreps.addEventListener('click', handleClickSmallestSupportChannel);
}
// click về trung tâm trợ giúp
function createlabelMediumComeBack(clickSupport) {
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);

    // sendMessage('large => medium => small'); // Gửi tin nhắn cố định
    // để if else đều có returnListSelectAI(); click lần đầu tiên thì nhận nhưng khi người dùng gửi tin nhắn rồi bấm gửi thì lại không nhận nữa
    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
}
// -----------------------------------

// ----------------------large => medium => small => smallest(click mua hàng online cùng gearvn => nút quay lại => click vào nút quay lại thì lại ra "Mua hàng online cùng gearvn")-------------------------
// -----------Mua online thế nào?...---------
function smallestHelpCenterBuyOnline(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng có những cách thức để mua hàng online tại Gearvn:
        - Đặt hàng trực tiếp trên website Gearvn.com
        - Liên hệ trực tiếp tổng đài 1800 6975 nhấn phím 1
        - Nhắn tin trực tiếp Website Gearvn.com hoặc Fanpage facebook Gearvn.
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterCondition(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Tất cả đơn hàng mua tại Gearvn đều sẽ được xuất hóa đơn VAT sau từ 03 - 05 ngày kể từ ngày Quý khách nhận hàng không bao gồm T7, chủ nhật và các ngày lễ.
        Nếu Quý khách có nhu cầu xuất hóa đơn VAT cho Công ty, vui lòng cung cấp thông tin xuất hóa đơn (MST doanh nghiệp) cho nhân viên kinh doanh tại thời điểm đặt hàng.
        + Đối với đơn hàng < 20 triệu Quý khách có thể thanh toán bằng tất cả các hình thức.
        + Đối với đơn hàng >20 triệu Gearvn khuyến kích Quý khách thanh toán từ tài khoản Công ty để hợp lệ hóa đơn.
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterWarrantyConditions(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Điều kiện đủ bảo hành:
        - Sản phẩm còn trong thời hạn bảo hành của GearVN; Thời hạn bảo hành được ghi nhận dựa trên thông tin mua hàng, số Serial Number của sản phẩm.
        - Sản phẩm phải còn tem niêm phong bảo hành hoặc tem của nhà phân phối. Với các sản phẩm cần bảo hành theo hộp, khách hàng phải gửi đầy đủ hộp và phụ kiện đi kèm.
        - Sản phẩm còn nguyên trạng, không trầy xước cấn móp, biến dạng ngoài quy định của hãng/ nhà phân phối.
        - Sản phẩm phát sinh lỗi trong quá trình sử dụng do nhà sản xuất như linh kiện, lỗi kỹ thuật. <br><br>
        Chi tiết tham khảo: https://gearvn.com/pages/bao-hanh
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterFormOfWarranty(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đối với sản phẩm Quý khách mua tại Gearvn và còn trong thời gian bảo hành, 
        nếu phát sinh lỗi Quý khách có thể mang đến trực tiếp hoặc gửi chuyển phát sản phẩm 
        đến Gearvn để được hỗ trợ kiểm tra và gửi hãng xử lý bảo hành.<br>
        Chi tiết tham khảo: https://gearvn.com/pages/chinh-sach-bao-hanh
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterWarrantyPeriod(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Trường hợp phát hiện ra lỗi:<br>
        • Gearvn tiến hành xử lý bảo hành theo chính sách bảo hành của sản phẩm.<br><br>
        Trường hợp chưa phát hiện ra lỗi:<br>
        • Gearvn có thể giữ lại sản phẩm để tiếp tục kiểm tra trong vòng 3 ngày làm việc nếu có yêu cầu kiểm tra của khách<br>
        hàng(không bao gồm thứ 7, Chủ Nhật & các ngày Lễ, Tết).<br>
        • Sau 3 ngày kiểm tra vẫn chưa phát hiện được lỗi của sản phẩm, Gearvn xin phép hoàn trả lại sản phẩm đến quý khách.<br><br>
        Chi tiết tham khảo: https://gearvn.com/pages/chinh-sach-bao-hanh
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterWarrantyExpenses(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        GearVN hỗ trợ tiếp nhận & sửa chữa sản phẩm (Có thu phí đối với khách hàng) với những sản phẩm không đủ điều kiện bảo hành.<br>
        Phí sẽ được GearVN liên hệ thông báo sau khi có kết quả thẩm định lỗi
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterChangePay(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        - Gearvn hỗ trợ đổi mới 100% sản phẩm nếu sản phẩm phát sinh lỗi từ nhà sản xuất 
        trong thời gian đổi mới 7 ngày hoặc 30 ngày (tùy sản phẩm) và thõa các điều kiện 
        theo kèm (Chi tiết tham khảo: https://gearvn.com/pages/chinh-sach-bao-hanh)<br>
        - Gearvn không hỗ trợ đổi/trả sản phẩm với các trường hợp khác.
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestHelpCenterComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps)
    HandleClickComeBack();
}
// --------------------
// -----------ĐIều kiện bảo hành...---------
function smallestPolicyWarrantyConditions(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Điều kiện đủ bảo hành:<br>
        - Sản phẩm còn trong thời hạn bảo hành của Gearvn; Thời hạn bảo hành được 
        ghi nhận dựa trên thông tin mua hàng, số Serial Number của sản phẩm.<br>
        - Sản phẩm phải còn tem niêm phong bảo hành hoặc tem của nhà phân phối. Với các 
        sản phẩm cần bảo hành theo hộp, khách hàng phải gửi đầy đủ hộp và phụ kiện đi kèm.<br>
        - Sản phẩm còn nguyên trạng, không trầy xước cấn móp, biến dạng ngoài quy định của hãng nhà phân phối.<br>
        - Sản phẩm phát sinh lỗi trong quá trình sử dụng do nhà sản xuất như linh kiện, lỗi kỹ thuật.<br><br>
        Chi tiết tham khảo: https://gearvn.com/pages/bao-hanh
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPolicyFormOfWarranty(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đối với sản phẩm Quý khách mua tại Gearvn và còn trong thời gian bảo hành, 
        nếu phát sinh lỗi Quý khách có thể mang đến trực tiếp hoặc gửi chuyển phát sản 
        phẩm đến Gearvn để được hỗ trợ kiểm tra và gửi hãng xử lý bảo hành.<br>
        Chi tiết tham khảo:<br>
        Chi tiết tham khảo: https://gearvn.com/pages/chinh-sach-bao-hanh
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPolicyWarrantyPeriod(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Trường hợp phát hiện ra lỗi:<br>
        • Gearvn tiến hành xử lý bảo hành theo chính sách bảo hành của sản phẩm.<br><br>
        Trường hợp chưa phát hiện ra lỗi:<br>
        • Gearvn có thể giữ lại sản phẩm để tiếp tục kiểm tra trong vòng 3 ngày làm việc 
        nếu có yêu cầu kiểm tra của khách<br>
        hàng(không bao gồm thứ 7, Chủ Nhật & các ngày Lễ, Tết).<br>
        • Sau 3 ngày kiểm tra vẫn chưa phát hiện được lỗi của sản phẩm, Gearvn xin phép 
        hoàn trả lại sản phẩm đến quý khách.<br><br>
        Chi tiết tham khảo: https://gearvn.com/pages/chinh-sach-bao-hanh
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPolicyWarrantyExpenses(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        GEARVN hỗ trợ tiếp nhận & sửa chữa sản phẩm (Có thu phí đối với khách hàng) với 
        những sản phẩm không đủ điều kiện bảo hành.<br>
        Phí sẽ được GearVN liên hệ thông báo sau khi có kết quả thẩm định lỗi
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPolicyInnovationWithdrawal(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Điều kiện sản phẩm được áp dụng đổi mới:
        • Sản phẩm phát sinh lỗi từ nhà sản xuất trong thời gian đổi mới 7 ngày hoặc 30 
        ngày (tùy sản phẩm)<br>
        • Sản phẩm có tem niêm phong còn nguyên vẹn, không thay đổi cấu trúc ban đầu.<br>
        • Sản phẩm không trầy xước, còn đầy đủ hộp, sách và phụ kiện.<br>
        • Hộp sản phẩm còn nguyên vẹn, không để rách, nát, biến dạng.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPolicyComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// --------------------
// -----------Hướng dẫn thanh toán...---------
function smallestPayMethods(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        GEARVN hiện tại có cách hình thức thanh toán như:<br>
        - Giao hàng thanh toán tiền mặt (COD).<br>
        - Thanh toán chuyển khoản.<br>
        - Trả góp.<br>
        - Thanh toán trực tiếp tại cửa hàng.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPayCOD(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Hình thức ship COD là hình thức giao hàng thu tiền. Áp dụng giao trong nội 
        thành hoặc ngoài tỉnh.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPayComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------Mua hàng trả góp...---------
function smallestPurchaseInterest(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách có thể tham khảo biểu phí trả góp tại link:<br>
        https://gearvn.com/pages/huong-dan-tra-gop
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseInstallment(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        GEARVN hỗ trợ các hình thức trả góp qua:<br>
        - Trả góp qua công ty tài chính HD SAISON<br>
        - Trả góp qua thẻ tín dụng MPOS<br>
        - Trả góp qua Fundiin
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseInstallmentTerms(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Điều kiện đối với trả góp qua công ty tài chính HD SAISON:<br>
        • Công dân Việt Nam từ đủ 18 đến 70 tuổi<br>
        • Chứng minh nhân dân (CMND)/Căn cước công dân(CCCD) còn giá trị.<br>
        • Hộ khẩu tại TP. Hồ Chí Minh và Hà Nội.<br><br>
        Điều kiện đối với trả góp qua thẻ tín dụng MPOS:<br>
        • Khách hàng cần chuẩn bị<br>
        CMND/CCCD + thẻ tín dụng (cả 2 đều phải chính chủ).<br>
        • Hạn mức thẻ tín dụng cần phải lớn hơn tổng số tiền của đơn hàng và phí chuyển đổi trả góp.<br>
        • Khách hàng có thể chọn trả góp toàn bộ giá trị đơn hàng hoặc trả góp một phần giá trị đơn hàng.<br>
        • Đối với một số sản phẩm, khách hàng phải tiến hành đặt cọc theo quy định của GEARVN.<br><br>
        Điều kiện trả góp qua Fundiin:<br>
        • Có Sim điện thoại chính chủ thuộc 3 nhà mạng Viettel, Mobi, Vina và thời gian sử dụng trên 6 tháng.<br>
        • Công dân Việt Nam từ đủ 18 và có Chứng minh nhân dân (CMND)/Căn cước công dân (CCCD) còn giá trị.<br><br>
        Chi tiết tham khảo: https://gearvn.com/pages/huong-dan-tra-gop
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseRegistrationForm(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng có những cách thức để đăng ký trả góp như sau:<br>
        - Đến trực tiếp hệ thống cửa hàng của Gearvn.<br>
        - Liên hệ trực tiếp tổng đài 1800 6975 nhấn phím 1<br>
        - Nhắn tin trực tiếp Website Gearvn.com hoặc Fanpage facebook Gearvn.
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseInstallmentBank(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách có thể xem các ngân hàng hỗ trợ trả góp tại:<br>
        https://gearvn.com/pages/huong-dan-tra-gop
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseinstallmentPeriod(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách có thể xem kỳ hạn trả góp tại:<br>
        https://gearvn.com/pages/huong-dan-tra-gop
    `);
    $('.box-chat').append(quickreps, button);
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseAvailableInInstallments(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Gearvn có hỗ trợ trả góp thẻ tín dụng và Fundiin qua hình thức ONLINE
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseContributeManyProducts(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Gearvn vẫn hỗ trợ trả góp nhiều sản phẩm khác nhau chỉ cần tổng giá trị đơn hàng trên 1.000.000VND (Fundiin) và 3.000.000vnđ (HD SAISON và Thẻ tín dụng).
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestPurchaseComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------Trả hàng...---------
// phần này còn thiếu chữ hình thức trả hàng
function smallestReturnsFormOfExchange(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Hình thức đổi hàng
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestReturnsConditionsOfExchange(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        - Gearvn hỗ trợ đổi mới 100% sản phẩm nếu sản phẩm phát sinh lỗi từ nhà sản xuất trong thời gian đổi mới 7 ngày hoặc 30 ngày (tùy sản phẩm) và thõa các điều kiện theo kèm (Chi tiết tham khảo:<br>
        https://gearvn.com/pages/chinh-sach-bao-hanh)<br>
        - Gearvn không hỗ trợ đổi/trả sản phẩm với các trường hợp khác.<br>
        Quý khách vui lòng liên hệ: 1800 6175 nhấn phím 1 hoặc Fanpage Gearvn để được hỗ trợ chi tiết.
    `);
    $('.box-chat').append(quickreps, button);
    
    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestReturnsWrongProductDelivered(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Nếu trường hợp Quý khách nhận đơn hàng và sai sản phẩm, vui lòng liên hệ với Gearvn qua các kênh sau để được hỗ trợ xử lý:<br>
        - Tổng đài 1800 6975 nhấn phím 1.<br>
        - Nhắn tin trực tiếp Fanpage facebook Gearvn.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestReturnsMissingProductDelivered(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Nếu trường Quý khách nhận đơn hàng và thiếu sản phẩm, vui lòng liên hệ với Gearvn 
        qua các kênh sau để được hỗ trợ xử lý:<br>
        - Tổng đài 1800 6975 nhấn phím 1<br>
        - Nhắn tin trực tiếp Fanpage facebook Gearvn.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestReturnsDefectiveGoods(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Nếu trường Quý khách nhận đơn hàng và kiểm tra sản phẩm phát sinh lỗi, vui lòng liên hệ với Gearvn qua các kênh sau để được hỗ trợ xử lý:<br>
        - Tổng đài 1800 6975 nhấn phím 1<br>
        - Nhắn tin trực tiếp Fanpage facebook Gearvn.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestReturnsComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------Hoàn tiền...---------
function smallestRefundForm(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Tùy vào hình thức thanh toán ban đầu của Quý khách<br>
        Gearvn sẽ hoàn tiền qua các hình thức:<br>
        - Hoàn tiền mặt tại showroom.<br>
        - Hoàn tiền chuyển khoản vào số tài khoản.<br>
        - Hoàn tiền về hạn mức thẻ tín dụng.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestRefundConditions(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Điều kiện hoàn tiền:<br>
        - Đơn hàng khách hàng thanh toán dư.<br>
        - Đơn hàng khách hàng cọc không có hàng và khách yêu cầu hủy đơn.<br>
        - Đơn hàng có sản phẩm lỗi và không có sản phẩm tương đương thay thế.
    `);
    $('.box-chat').append(quickreps, button);
    
    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestRefundTime(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Tùy vào hình thức thanh toán ban đầu của Quý khách sẽ có thời gian hoàn tiền khác nhau:<br>
        + Chuyển khoản ATM nội địa: từ 03 - 05 ngày không bao gồm Thứ 7, Chủ Nhật & các ngày Lễ, Tết.<br>
        + Thẻ tín dụng: từ 07<br>
        – 15 ngày không bao gồm Thứ 7, Chủ Nhật & các ngày Lễ, Tết.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestRefundComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------Đơn hàng/Vận chuyển...---------
function smallestOrderTransportEditReceivingAddress(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng vui lòng cung cấp các thông tin sau:<br>
        + Mã đơn hàng (Nếu có):<br>
        + Số điện thoại đặt hàng:<br>
        + Họ & tên người đặt hàng:<br>
        + Địa chỉ cần thay đổi:
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestOrderTransportDeliveryStatus(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng vui lòng cung cấp các thông tin sau:<br>
        + Mã đơn hàng (Nếu có):<br>
        + Số điện thoại đặt hàng:<br>
        + Họ & tên người đặt hàng:<br>
        GEARVN sẽ phản hồi quý khách ngay sau khi kiểm tra thông tin.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestOrderTransportTransportFee(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đơn hàng có giá trị dưới 5.000.000vnđ:<br>
        + Phí: 40.000vnđ giao nhanh từ 2h – 4h áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).<br>
        + Phí: 25.000vnđ giao hàng tiêu chuẩn từ 01 – 03 ngày không bao gồm T7 & chủ nhật áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).<br>
        + Phí: 40.000vnđ giao hàng từ 03 – 07 không bao gồm T7 & chủ nhật ngày áp dụng cho các tỉnh thành khác.<br>
        Đơn hàng có giá trị trên 5.000.000vnđ: Gearvn miễn phí vận chuyển áp dụng nội thành và các tỉnh thành khác.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestOrderTransportFreeShip(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đơn hàng có giá trị trên 5.000.000vnđ: Gearvn miễn phí vận chuyển áp dụng cho nội thành và các tỉnh thành khác.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestOrderTransportExpressDelivery(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Gearvn có hỗ trợ giao hỏa tốc với một số sản phẩm: Phí giao hàng là 40.000vnđ giao nhanh từ 2h – 4h áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestOrderTransportComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------Các kênh hỗ trợ...---------
function smallestSupportChannelEditShippingAddress(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng vui lòng cung cấp các thông tin sau:<br>
        + Mã đơn hàng (Nếu có):<br>
        + Số điện thoại đặt hàng:<br>
        + Họ & tên người đặt hàng:<br>
        + Địa chỉ cần thay đổi:
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestSupportChannelDeliveryStatus(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Quý khách hàng vui lòng cung cấp các thông tin sau:<br>
        + Mã đơn hàng (Nếu có):<br>
        + Số điện thoại đặt hàng:<br>
        + Họ & tên người đặt hàng:<br>
        GEARVN sẽ phản hồi quý khách ngay sau khi kiểm tra thông tin.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestSupportChannelTransportFee(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đơn hàng có giá trị dưới 5.000.000vnđ:<br>
        + Phí: 40.000vnđ giao nhanh từ 2h – 4h áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).<br>
        + Phí: 25.000vnđ giao hàng tiêu chuẩn từ 01 – 03 ngày không bao gồm T7 & chủ nhật áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).<br>
        + Phí: 40.000vnđ giao hàng từ 03 – 07 không bao gồm T7 & chủ nhật ngày áp dụng cho các tỉnh thành khác.<br>
        Đơn hàng có giá trị trên 5.000.000vnđ: Gearvn miễn phí vận chuyển áp dụng nội thành và các tỉnh thành khác.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestSupportChannelFreeShip(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Đơn hàng có giá trị trên 5.000.000vnđ: Gearvn miễn phí vận chuyển áp dụng cho nội thành và các tỉnh thành khác.
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestSupportChannelExpressDelivery(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickreps');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${ clickSupport }</p>`;

    let button = document.createElement('button');//     padding: 10px 35px;
    button.setAttribute('class', 'btn-comeBack py-10px px-35px ms-3 border border-dbdbdb bg-white rounded-1');
    let textNode = document.createTextNode('Quay lại');
    button.appendChild(textNode);

    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage(`
        Gearvn có hỗ trợ giao hỏa tốc với một số sản phẩm: Phí giao hàng là 40.000vnđ giao nhanh từ 2h – 4h áp dụng trong nội thành HCM/Hà Nội (khoảng cách dưới 15km).
    `);
    $('.box-chat').append(quickreps, button);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    HandleClickComeBack();
}
function smallestSupportChannelComeBack(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');

    const mapObjectLarge = arrQuickreps.map(items => {
        let { mediumTitle } = items
        return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${ mediumTitle }</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${ mediumTitle }</span>
        </div>
        `;
    }).join('');

    quickreps.innerHTML = `
      <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
          ${ mapObjectLarge }
      </div>
    `;

    
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
    
    // nếu để append(div, quickreps); thì div đứng trước thì xuất trước, quickreps đứng sau thì xuất sau, ngược lại cũng thế
    $('.box-chat').append(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    $('.box-chat').appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    quickreps.addEventListener('click', handleClickQuickreps);
    HandleClickComeBack();
}
// -----------------------------------
// -----------click vào nút quay lại...---------
function handleClickSmallestAndSmallBuyOnline(clickSupport) {
    let quickreps = document.createElement('div');
    quickreps.setAttribute('class', 'quickrepSmall');
  
    const mapObjectLarge = arrQuickreps.map((items) => {
      let { mediumTitle } = items;
      return `
        <div class="quickrepSmall-item position-relative">
            <p class="quickreps-text mb-0 fs-12px fw-400">${mediumTitle}</p>
            <span class="quickreps-dropdown position-absolute fs-12px text-white fw-500 rounded-1 text-nowrap px-2">${mediumTitle}</span>
        </div>
      `;
    }).join('');
  
    quickreps.innerHTML = `
        <div class="quickreps-content d-flex align-items-center flex-wrap ms-3 cursor-pointer">
            ${mapObjectLarge}
        </div>
    `;
  
    let div = document.createElement('div');
    div.setAttribute('class', 'user-chat position-relative text-end pe-3');
    div.innerHTML = `<p class="fs-13px fw-400 d-inline-block px-20px my-2 py-10px bg-2392740 text-white rounded-3 mw-187px text-nowrap">${clickSupport}</p>`;
  
    let boxChat = document.querySelector('.box-chat');
    boxChat.appendChild(div);
    sendMessage('GEARVN xin chào, vui lòng chọn nội dung cần hỗ trợ');
    boxChat.appendChild(quickreps);

    // không cho tin nhắn AI và tin nhắn nhân viên gửi tin nhắn
    clearAllTimeOut();
    // kích hoạt lại sự kiện, nếu không kích hoạt thì click lại lần thì nó sẽ không chạy
    quickreps.addEventListener('click', handleClickQuickreps);
}
function HandleClickComeBack() {
    // nếu không dùng để gắn hết tất cả click cho từng phần tử thì khi click lần 2 sẽ không thể chạy được
    $$('.btn-comeBack').forEach(items => {
        items.onclick = handleSmallestAndSmall;
    })
}
function clearTimeoutChat() {
    // làm như vầy để khi người dùng đang chat thì không có hiện lên khung đánh giá
    // Hủy bỏ hàm setTimeout hiện tại nếu có
    clearTimeout(timeoutId);
    // thêm active trong khoảng bao nhiêu giây là sẽ kết thúc cuộc trò truyện với khách hàng
    timeoutId = setTimeout(() => {
        $('.chat--footer-icons').classList.remove('staff-chat');
        $$('.chat--footer-icons svg').forEach(items => {
            items.setAttribute('width', '20')
        })
        $('.evaluate-chat').classList.add('active');
        $('.dropdown-icon-bars').classList.add('d-none');
        $('.userSend-item:nth-of-type(7)').classList.add('d-none');
    }, 15000); // Kích hoạt sau 20 phút (20 * 60 * 1000 milliseconds)
}
function scrollEndOfPage() {
    const scrollEnd = calculateScrollEnd(); // Tính toán vị trí cuối cùng
    // Cuộn tự động xuống cuối
    $('.show-chat--body').scrollTop = scrollEnd;
    // Hàm để tính toán vị trí cuối cùng
    function calculateScrollEnd() {
        const scrollHeight = $('.show-chat--body').scrollHeight;
        const clientHeight = $('.show-chat--body').clientHeight;
        const scrollEnd = scrollHeight - clientHeight;
        return scrollEnd;
    }
}
function sendMessage(message) {
    let div = document.createElement('div');
    div.setAttribute('class','box-chat__AI ps-60px');
    div.innerHTML = `<p class="mb-0 text-333333 fs-13px fw-400 d-inline-block px-20px py-10px mb-2 bg-f5f5f5 rounded-3 text-break mw-187px text-start">${ message }</p>`;
    $('.box-chat').appendChild(div);
}
// người dùng gửi tin nhắn
$('.chat--footer-icons .icon-send').addEventListener('click', (e) => {
    $('.chat--footer-icons > div:last-child').classList.replace('d-block', 'd-none');
    newSendChat();
    /**
     * nếu mà để const scrollEnd = calculateScrollEnd(); code trở về cuối
     * để ở đây thì khi bấm gửi tin nhắn thì nó chỉ chạy đến khúc 
     * người dùng gửi chứ phần code AI sẽ không thể chạy xuống cuối cùng
     */
    
    // clear hours, check xem thử nếu nhân viên gửi tin nhắn thì khi user chat lại sẽ mất thời gian được xét
    if(!$('.chat--footer-icons').classList.contains('staff-chat')) {
        checkAISendMessage();
        
        handleClickAdditionalDiv(e);
      
        // sendMessage('Quý khách vui lòng chờ trong giây lát, tin nhắn đang được chuyển đến nhân viên.'); // Gửi tin nhắn cố định
        // sendMessage('Dạ chào anh/chị, em có thể hỗ trợ được gì cho mình ạ'); // Gửi tin nhắn cố định 
    
        // handleTime();
        clearChatHours();
    }
    
    scrollEndOfPage();

    clearTimeoutChat();
})

inputData.addEventListener('keyup', function(e) {
    /** check enter: khi người dùng bấm enter thì sẽ gửi tin nhắn
     * + phải dùng keyup thay vì dùng keypress để check enter, nếu mà dùng keypress
     * thì sẽ không thể nào reset textarea về ban đầu, chỉ có keyup mới làm được 
     */
    if(e.code == "Enter") {
        newSendChat();
        checkAISendMessage();
        returnListSelectAI();
        handleClickAdditionalDiv(e);
        handleTime();
        clearChatHours();
        scrollEndOfPage();
        clearTimeoutChat();
        inputData.value = inputData.value;
    }
    if(this.value) {
        $('.chat--footer-icons').classList.add('user-chat');
        $('.chat--footer-icons > div:last-child').classList.replace('d-none', 'd-block');
    } else {
        $('.chat--footer-icons').classList.remove('user-chat');
        // nếu không thêm d-none và xóa d-none thì sẽ lỗi giao diện, xóa tk div icon-send
        $('.chat--footer-icons > div:last-child').classList.replace('d-block', 'd-none');
    }
})

// xử lý click vào là xóa .chat-wrap và hiện .show-chat
$('.chat-wrap').addEventListener('click', function() {
    this.classList.remove('active')
    $('.show-chat').classList.add('active');
})
// xử lý click vào close thì tắt khung chat và hiện khung chat tư vấn
$('.icon-close').addEventListener('click', () => {
    $('.chat-wrap').classList.add('active');
    $('.show-chat').classList.remove('active');
})
// xử lý textarea
// DOMContentLoaded: tạo ra cây dom Điều này có nghĩa là bạn có thể thực thi mã JavaScript liên quan đến thao tác DOM mà không cần chờ đợi việc tải hoàn toàn các tài nguyên khác như hình ảnh hoặc nội dung nhúng từ bên ngoài.
document.addEventListener('DOMContentLoaded', function() {
    $('.chat-group').addEventListener('wheel', (event) => {
        event.stopPropagation();
    });
});
// hàm này dùng để hiển thị time mặc định khi đã có tin nhắn
handleTime();
export { 
    newSendChat,
    checkAISendMessage,
    returnListSelectAI,
    handleClickAdditionalDiv,
    handleTime,
    clearChatHours,
    scrollEndOfPage,
    clearTimeoutChat,
}
export default pageMain;