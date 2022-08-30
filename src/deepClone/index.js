/**
 * 深拷贝
 * @param {*} obj 源对象
 * @returns {*} 目标对象
 */
const deepClone = (obj, cache = new WeakMap()) => {
  // 如果对象是null或undefined或基本类型，则不进行拷贝
  if (obj == null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  if (cache.has(obj)) return cache.get(obj);
  //  使用对象所属的构造函数创建一个新对象
  let cloneObj = new obj.constructor();
  // 缓存对象，用于循环引用的情况
  cache.set(cache, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key], cache);
    }
  }
  return cloneObj;
};

export default deepClone;
