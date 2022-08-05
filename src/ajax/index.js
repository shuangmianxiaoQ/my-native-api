/**
 * Ajax封装
 * @param {*} options { type, url, data, success, fail }
 */
const ajax = (options = { type: "GET" }) => {
  const xhr = new XMLHttpRequest();
  options.type = options.type.toUpperCase();

  if (options.type === "GET") {
    // 请求参数未处理
    xhr.open("GET", options.url, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, false);
    xhr.send(options.data);
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        options.success && options.success(xhr.responseText);
      } else {
        options.fail && options.fail(xhr.status);
      }
    }
  };
};

export default ajax;
