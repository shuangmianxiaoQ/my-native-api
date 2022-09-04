/**
 * 实现Promise.race
 * @param {Promise[]} promises promise实例数组
 * @returns {Promise}
 */
const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
};

export default promiseRace;
