/**
 * 实现数组的乱序输出
 * @param {Array} arr
 */
const disOrderArray = (arr) => {
  const res = [...arr];

  for (let i = 0; i < res.length; i++) {
    const randomIndex = Math.round(Math.random() * (res.length - 1 - i)) + i;
    [res[i], res[randomIndex]] = [res[randomIndex], res[i]];
  }

  return res;
};

export default disOrderArray;
