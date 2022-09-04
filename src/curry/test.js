import curry from ".";

const fn = (a, b, c, d) => a + b + c + d;

const myFn = curry(fn);

console.log(myFn(1)(2)(3)(4));
console.log(myFn(1, 2)(3)(4));
console.log(myFn(1)(2, 3, 4));
