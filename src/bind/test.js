/* eslint no-extend-native: "off" */

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  const args = [...arguments].slice(1);
  const fn = this;

  return function Fn() {
    // 修改this指向
    return fn.apply(
      this instanceof Fn ? new Fn(...arguments) : context,
      // 动态传递参数
      args.concat(...arguments)
    );
  };
};

function fn(...args) {
  console.log(this, args);
}

const obj = {
  name: "jianwu"
};

const bindFn = fn.myBind(obj);
bindFn(1, 2);
