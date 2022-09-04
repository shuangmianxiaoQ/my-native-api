import Singleton from ".";

const a = Singleton.getInstance("a");
const b = Singleton.getInstance("b");

console.log(a, b);
console.log(a === b);
