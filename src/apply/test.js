/* eslint no-extend-native: "off" */

Function.prototype.myApply = function (context, args) {
  context = context || window;
  let fn = Symbol("fn");
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

const obj = {
  name: "jianwu"
};

function fun() {
  console.log("name", this.name);
  console.log("arguments", arguments);
}

fun.myApply(obj, [1, 2, 3]);
