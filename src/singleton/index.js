function Singleton(name) {
  this.name = name;
}

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

export default Singleton;
