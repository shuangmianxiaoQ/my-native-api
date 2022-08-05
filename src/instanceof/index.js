/**
 * 实现instanceof
 * @param {*} left 实例
 * @param {*} right 构造函数
 */
const myInstanceof = (left, right) => {
  if (typeof left !== "object" || left === null) return false;
  // 获取left的__proto__
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};

export default myInstanceof;
