import list2tree from ".";

const list = [
  { id: 10001, data: "北京", pid: 100 },
  { id: 10002, data: "上海", pid: 100 },
  { id: 1000201, data: "浦东", pid: 10002 },
  { id: 100, data: "中国", pid: null }
];

console.log(list2tree(list));
