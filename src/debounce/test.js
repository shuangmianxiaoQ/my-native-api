import debounce from ".";

//模拟一段 ajax 请求
const ajax = (value) => {
  // 此处的 this 指向 debounceInput 这个 input 框
  console.log("ajax request " + value);
};

// 未防抖
const input = document.getElementById("input");
input.addEventListener("input", (e) => ajax(e.target.value));

// 防抖
const debounceInput = document.getElementById("debounce");
const debounceAjax = debounce(ajax, 500);
debounceInput.addEventListener("input", (e) => debounceAjax(e.target.value));
