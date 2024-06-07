import userInterfaceCpn from './userInterface.js';
import backtotopCpn from './backtotop.js';
import chatCpn from "./chat.js";
import starCpn from "./star.js";
import timeSendMessageCpn from './timeSendMessage.js';
import starStaffCpn from './starLikeStaff.js';

import indexShowAllClickIconBarCpn from './showAllClickIconBar/index.js';
import indexShowIconSmileCpn from './showIconSmileFileLike/index.js';
import resetEventCpn from './resetEvent.js';
import handleClickUserSendCpn from './handleClickUserSend.js';

export default userInterfaceCpn;

// code lạ đời, chạy 1 cái là nhận cả true lẫn false, vừa nhận active vừa xóa active
// function handleAddgncpn2(index) {
//     const stars = Array.from(evaluateStars);
//     stars.forEach((star, i) => {
//       if (i <= index) {
//         star.classList.add('gncpn2');
//       } else {
//         star.classList.remove('gncpn2');
//       }
//     });
// }