import throttle from "./index";

const biu = function () {
  console.log("biu biu biu");
};

// 节流
const throttleFn = throttle(biu, 300);
window.addEventListener("scroll", throttleFn, false);
