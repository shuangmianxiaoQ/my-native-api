/**
 * 节流
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
const throttle = (fn, delay = 100) => {
  // 通过闭包存储一个锁状态
  let lock = false;
  return function () {
    // 如果是加锁状态，则直接 return
    if (lock) return;
    // 执行定时器前先加个锁
    lock = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      // 定时器执行完后锁改为 false，表示可以执行下次循环了
      lock = false;
    }, delay);
  };
};

const throttle2 = (fn, delay = 100) => {
  let curTime = Date.now();
  return function () {
    const nowTime = Date.now();
    // 如果两次间隔时间超过指定时间，则执行函数
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      fn.apply(this, arguments);
    }
  };
};

export default throttle2;
