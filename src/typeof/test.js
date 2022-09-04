import getType from ".";

console.log(getType("12we"));
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(Symbol()));
console.log(getType([1, 2, 3]));
console.log(getType({ a: 2 }));
console.log(getType(new Date()));
console.log(getType(/123/));
