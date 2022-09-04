/**
 * 函数柯里化
 * @param {Function} fn
 * @returns {Function}
 */
const curry = (fn) => {
  return function curriedFn(...args) {
    console.log(fn.length, args);
    if (args.length < fn.length) {
      return function () {
        // 拼接参数并递归调用
        return curriedFn(...args.concat(...arguments));
      };
    }
    return fn(...args);
  };
};

export default curry;
