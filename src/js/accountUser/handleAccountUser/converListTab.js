import { $, $$, $$$ } from "../../../store/index.js";
$$(".js-items__converList").forEach((lists, active) => {
  lists.addEventListener("click", (e) => {
    e.preventDefault();

    for (let item of $$(".js-items__converList")) {
      item.classList.remove("active");
    }
    $$(".js-items__converList")[active].classList.add("active");

    converTabContent(active);
  });
});
function converTabContent(active) {
  $$(".js-tab-content").forEach((items) => {
    items.classList.remove("active");
  });
  $$(".js-tab-content")[active].classList.add("active");
}

$$(".js-items__logOut").forEach(item => {
  item.addEventListener('click', clickShowModel);
})
export function clickShowModel(e) {
  console.log('aaa');
  e.preventDefault();
  
  $(".logOut-coating-accountUser-js").classList.add("active");
  $(".logOut-js").classList.add("active");
}
export default $;
