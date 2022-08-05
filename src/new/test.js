import mynew from ".";

function Person(name, age) {
  this.name = name;
  this.age = age;
  // return { a: 111 };
}

Person.prototype.say = function () {
  console.log(this.name);
};

const p = mynew(Person, "jianwu", "26");

console.log(p);
p.say();
