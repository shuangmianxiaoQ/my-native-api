/**
 * 日期格式化
 * @param {Date} date 日期
 * @param {String} format 格式
 * @returns {String} 格式化日期
 */
const dateFormat = (date, format) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return format.replace(/yyyy/, year).replace(/MM/, month).replace(/dd/, day);
};

export default dateFormat;
