/**
 * 缓存函数
 * @param {Function} fn
 * @param {*} content
 */
const memoize = function (fn, content = this) {
  const cache = {};
  return (...keys) => {
    if (!cache[keys]) {
      console.log("not cache");
      cache[keys] = fn.apply(content, keys);
    }
    return cache[keys];
  };
};

export default memoize;
