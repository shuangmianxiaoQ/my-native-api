// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/debounce/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 防抖
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
var debounce = function debounce(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timeoutId; // 不能使用箭头函数，apply方法中要使用 this和 arguments

  return function () {
    var _arguments = arguments,
        _this = this;

    // 每当用户输入时，把前一个定时器清掉
    clearTimeout(timeoutId); // 创建一个新的定时器，保证在 delay范围内继续输入字符，不会执行 fn

    timeoutId = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, delay);
  };
};

var _default = debounce;
exports.default = _default;
},{}],"src/debounce/test.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//模拟一段 ajax 请求
var ajax = function ajax(value) {
  // 此处的 this 指向 debounceInput 这个 input 框
  console.log("ajax request " + value);
}; // 未防抖


var input = document.getElementById("input");
input.addEventListener("input", function (e) {
  return ajax(e.target.value);
}); // 防抖

var debounceInput = document.getElementById("debounce");
var debounceAjax = (0, _.default)(ajax, 500);
debounceInput.addEventListener("input", function (e) {
  return debounceAjax(e.target.value);
});
},{".":"src/debounce/index.js"}],"src/throttle/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 节流
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
var throttle = function throttle(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  // 通过闭包存储一个锁状态
  var lock = false;
  return function () {
    var _arguments = arguments,
        _this = this;

    // 如果是加锁状态，则直接 return
    if (lock) return; // 执行定时器前先加个锁

    lock = true;
    setTimeout(function () {
      fn.apply(_this, _arguments); // 定时器执行完后锁改为 false，表示可以执行下次循环了

      lock = false;
    }, delay);
  };
};

var _default = throttle;
exports.default = _default;
},{}],"src/throttle/test.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var biu = function biu() {
  console.log("biu biu biu");
}; // 节流


var throttleFn = (0, _index.default)(biu, 300);
window.addEventListener("scroll", throttleFn, false);
},{"./index":"src/throttle/index.js"}],"src/deepClone/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * 深拷贝
 * @param {*} obj 源对象
 * @returns {*} 目标对象
 */
var deepClone = function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  // 如果对象是null或undefined或基本类型，则不进行拷贝
  if (obj == null || _typeof(obj) !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj); // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环

  if (cache.has(obj)) return cache.get(obj); //   使用对象所属的构造函数创建一个新对象

  var cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key]);
    }
  }

  return cloneObj;
};

var _default = deepClone;
exports.default = _default;
},{}],"src/deepClone/test.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {
  a: 1,
  b: null,
  c: function c() {},
  d: /\d{3,5}/,
  e: {
    e1: "ee",
    e2: [1, 2, 3],
    e3: {
      x: 10,
      y: 20
    }
  }
};
var cloneObj = (0, _.default)(obj);
cloneObj.c = new Date();
cloneObj.e.e1 = 11;
cloneObj.e.e2[1] = 666;
cloneObj.e.e3.y = 22;
console.log(obj, cloneObj);
},{".":"src/deepClone/index.js"}],"src/instanceof/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * 实现instanceof
 * @param {*} left 实例
 * @param {*} right 构造函数
 */
var myInstanceof = function myInstanceof(left, right) {
  if (_typeof(left) !== "object" || left === null) return false; // 获取left的__proto__

  var proto = Object.getPrototypeOf(left);

  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};

var _default = myInstanceof;
exports.default = _default;
},{}],"src/instanceof/test.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Person(name) {
  this.name = name;
}

var p = new Person("jianwu");
console.log((0, _.default)("3", String), "'3' instanceof String");
console.log((0, _.default)([1], Array), "[1] instanceof Array");
console.log((0, _.default)(p, Person), "p instanceof Person");
},{".":"src/instanceof/index.js"}],"src/new/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 实现new
 * @param {Function} Func 构造函数
 * @param {*} args 参数
 */
var mynew = function mynew(Func) {
  // 创建一个新对象
  var obj = {}; // 新对象原型指向构造函数的原型对象

  obj.__proto__ = Func.prototype; // 将构造函数的this指向新对象

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var result = Func.apply(obj, args); // 根据返回值判断：构造函数返回一个对象的话，new操作返回的是该对象

  return result instanceof Object ? result : obj;
};

var _default = mynew;
exports.default = _default;
},{}],"src/new/test.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Person(name, age) {
  this.name = name;
  this.age = age; // return { a: 111 };
}

Person.prototype.say = function () {
  console.log(this.name);
};

var p = (0, _.default)(Person, "jianwu", "26");
console.log(p);
p.say();
},{".":"src/new/index.js"}],"src/ajax/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ajax = function ajax() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    type: "GET"
  };
  var xhr = new XMLHttpRequest();
  options.type = options.type.toUpperCase();

  if (options.type === "GET") {
    // 请求参数未处理
    xhr.open("GET", options.url, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, false);
    xhr.send(options.data);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        options.success && options.success(xhr.responseText);
      } else {
        options.fail && options.fail(xhr.status);
      }
    }
  };
};

var _default = ajax;
exports.default = _default;
},{}],"src/ajax/test.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _.default)({
  type: "get",
  url: "https://jsonplaceholder.typicode.com/todos/1",
  success: function success(text) {
    console.log(text);
  },
  fail: function fail(status) {
    console.error(status);
  }
});
(0, _.default)({
  type: "POST",
  url: "https://jsonplaceholder.typicode.com/posts",
  data: "",
  success: function success(text) {
    console.log(text);
  },
  fail: function fail(status) {
    console.error(status);
  }
});
},{".":"src/ajax/index.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./debounce/test");

require("./throttle/test");

require("./deepClone/test");

require("./instanceof/test");

require("./new/test");

require("./ajax/test");

require("./styles.css");
},{"./debounce/test":"src/debounce/test.js","./throttle/test":"src/throttle/test.js","./deepClone/test":"src/deepClone/test.js","./instanceof/test":"src/instanceof/test.js","./new/test":"src/new/test.js","./ajax/test":"src/ajax/test.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33879" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map