/**
 * 数组扁平化
 * @param {Array} arr
 */
const flatten = (arr) => {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
};

export default flatten;
