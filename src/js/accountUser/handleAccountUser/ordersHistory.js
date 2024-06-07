import { $, $$, $$$ } from "../../../store/index.js";

// toggle navbar add active css w100 red
$$(".box-info__item--js").forEach((item, index) => {
  item.addEventListener("click", function () {
    for (let item of $$(".box-info__item--js")) {
      item.classList.remove("active");
    }
    $$(".box-info__item--js")[index].classList.add("active");
  });
});

export default $;
