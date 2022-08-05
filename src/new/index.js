/**
 * 实现new
 * @param {Function} Func 构造函数
 * @param {*} args 参数
 */
const mynew = (Func, ...args) => {
  // 创建一个新对象
  const obj = {};
  // 新对象原型指向构造函数的原型对象
  obj.__proto__ = Func.prototype;
  // 将构造函数的this指向新对象
  const result = Func.apply(obj, args);
  // 根据返回值判断：构造函数返回一个对象的话，new操作返回的是该对象
  return result instanceof Object ? result : obj;
};

export default mynew;
