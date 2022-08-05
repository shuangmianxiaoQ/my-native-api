import deepClone from ".";

const obj = {
  a: 1,
  b: null,
  c: function () {},
  d: /\d{3,5}/,
  e: {
    e1: "ee",
    e2: [1, 2, 3],
    e3: {
      x: 10,
      y: 20
    }
  }
};

const cloneObj = deepClone(obj);

cloneObj.c = new Date();
cloneObj.e.e1 = 11;
cloneObj.e.e2[1] = 666;
cloneObj.e.e3.y = 22;

console.log(obj, cloneObj);
