import { pageMain , $, $$, $$$ } from '../../store/index.js';
import { 
    newSendChat,
    menuItemMap,
    handleClickAdditionalDiv,
    returnListSelectAI,
    createQuickReps,
    createShoppingConsulting,
    createLookUpWarranty,
    createTechnicalAssistance,
    clearTimeoutChat,
    scrollEndOfPage,
    clearChatHours,
    handleTime,
    resetTimeOut,
    clearAllTimeOut,
} from './chat.js';
import { resetClassChat } from './resetEvent.js';
import { checkUser } from './showAllClickIconBar/checkInput.js';
let timeoutId; // Biến để lưu tham chiếu đến hàm setTimeout
$$('.userSend-item').forEach((items, index) => {
    items.addEventListener('click', function() {
        if(index == 0) {
            createQuickReps('Trung tâm trợ giúp');

            handleTime();
            clearChatHours();
            scrollEndOfPage();
            // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
            clearTimeoutChat();
            resetTimeOut();

            resetClassChat();
        }
        if(index == 1) {
            createShoppingConsulting('Tư vấn bán hàng');

            handleTime();
            clearChatHours();
            scrollEndOfPage();
            // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
            clearTimeoutChat();
            resetTimeOut();

            resetClassChat();
        }
        if(index == 2) {
            createLookUpWarranty('chăm sóc khách hàng');

            handleTime();
            clearChatHours();
            scrollEndOfPage();
            // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
            clearTimeoutChat();
            resetTimeOut();

            resetClassChat();
        }
        if(index == 3) {
            createTechnicalAssistance('Hỗ trợ kỹ thuật')

            handleTime();
            clearChatHours();
            scrollEndOfPage();
            // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
            clearTimeoutChat();
            resetTimeOut();

            resetClassChat();
        }
        if(index == 4) {
            newSendChat('Kết thúc chat');
            // clear tin nhắn nhân viên gửi và clear đánh giá sau khi kết thúc tin nhắn
            clearAllTimeOut();
            scrollEndOfPage();

            resetClassChat();
        }
        if(index == 6) {
            // $('.userSend-item:nth-of-type(7)').addEventListener('click', function() {
            // })
            $('.f-conversation__coating').classList.add('active');
            $('.f-conversation__content').classList.add('active');

            resetClassChat();
        }
        if(index == 7) {
            $('.user-name-input').value = $('.rs-username').innerText;
            $('.dropdown-userName-coating').classList.add('active');
            $('.dropdown-userName').classList.add('active');
            clearAllTimeOut();
            $('.btn-userName-save').addEventListener('click', function(e) {
                let saveChatInput = sessionStorage.getItem('saveChatInput');
                // ở đây bắt buộc phải có 2 dòng if else giống nhau, tại vì mặc tk localStorage nó sẽ chạy bên trong trước nhưng bên ngoài nó chưa cập nhật nên không thể render ra màn hình được
                if(saveChatInput) {
                    $$('.rs-username').forEach(items => {
                        // nếu mà dùng innerText thì nó sẽ xuất ra chuỗi string thô bao gồm thẻ span cũng biến thành chuỗi thô luôn mà k biến thành thẻ dom span được
                        items.innerHTML = saveChatInput;
                    })
                } else {
                    $$('.rs-username').forEach(items => {
                        // nếu mà dùng innerText thì nó sẽ xuất ra chuỗi string thô bao gồm thẻ span cũng biến thành chuỗi thô luôn mà k biến thành thẻ dom span được
                        items.innerHTML = saveChatInput;
                    })
                }
                checkUser(e);
            })
            resetClassChat();
        }
    })
})
$('.f-conversation__cancel').addEventListener('click', handleClickConversation);
$('.f-conversation__end').addEventListener('click', () => {
        returnListSelectAI();
        handleTime();
        clearChatHours();
        scrollEndOfPage();
        // cập nhật lại lại khi gửi tin nhắn thì thanh scroll sẽ tự động chạy xuống cuối trang
        clearTimeoutChat();
        resetTimeOut();

        handleClickConversation();
});
function handleClickConversation() {
    $('.f-conversation__coating').classList.remove('active');
    $('.f-conversation__content').classList.remove('active');
}
export default $;