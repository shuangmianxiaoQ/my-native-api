/**
 * 深拷贝
 * @param {*} obj 源对象
 * @returns {*} 目标对象
 */
const deepClone = (obj) => {
  // 如果对象是null或undefined，则不进行拷贝
  if (obj == null) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 如果对象是基本类型，不需要拷贝
  if (typeof obj !== "object") return obj;
  let cloneObj = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
};

export default deepClone;
