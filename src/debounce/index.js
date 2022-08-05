/**
 * 防抖
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
const debounce = (fn, delay = 300) => {
  let timeoutId;
  // 不能使用箭头函数，apply方法中要使用 this和 arguments
  return function () {
    // 每当用户输入时，把前一个定时器清掉
    clearTimeout(timeoutId);
    // 创建一个新的定时器，保证在 delay范围内继续输入字符，不会执行 fn
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

export default debounce;
