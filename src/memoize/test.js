import memoize from ".";

const add = (x, y) => x + y;

const calc = memoize(add);

console.log(calc(2, 3));
console.log(calc(2, 3));
