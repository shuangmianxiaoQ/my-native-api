import MyPromise from ".";
import promiseAll from "./all";
import promiseRace from "./race";

const promise = new MyPromise((resolve) => {
  resolve("success");
});

promise.then((res) => {
  console.log(res);
});

const sleep = (ms) => {
  return new Promise((reslove) => {
    setTimeout(() => reslove(ms), ms);
  });
};

const p1 = sleep(1000);
const p2 = sleep(3000);
const p3 = sleep(2000);

promiseAll([p1, p2, p3]).then((res) => {
  console.log(res);
});

promiseRace([p1, p2, p3]).then((res) => {
  console.log(res);
});
