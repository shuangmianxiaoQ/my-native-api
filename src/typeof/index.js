/**
 * @param {*} value
 * @returns {String} 返回类型
 */
const getType = (value) => {
  if (value === null) return "null";
  if (typeof value === "object") {
    const str = Object.prototype.toString.call(value);
    return str.split(" ")[1].split("]")[0].toLowerCase();
  } else {
    return typeof value;
  }
};

export default getType;
