import dateFormat from ".";

const d1 = dateFormat(new Date("2020-12-01"), "yyyy/MM/dd");
const d2 = dateFormat(new Date("2020-04-01"), "yyyy/MM/dd");
const d3 = dateFormat(new Date(), "yyyy年MM月dd日");

console.log(d1);
console.log(d2);
console.log(d3);
