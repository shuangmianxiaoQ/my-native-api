/**
 * 将扁平化list转为树结构
 * @param {Array} data 扁平化list（其中id和pid有关联关系）
 */
const list2tree = (data) => {
  const map = new Map();
  const tree = [];

  data.forEach((item) => {
    map.set(item.id, item);
  });

  data.forEach((item) => {
    // 通过map找到其父节点
    const parent = map.get(item.pid);
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
};

export default list2tree;
