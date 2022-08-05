import myInstanceof from ".";

function Person(name) {
  this.name = name;
}

const p = new Person("jianwu");

console.log(myInstanceof("3", String), "'3' instanceof String");
console.log(myInstanceof([1], Array), "[1] instanceof Array");
console.log(myInstanceof(p, Person), "p instanceof Person");
