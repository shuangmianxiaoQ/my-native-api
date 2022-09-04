/**
 * 实现Promise.all
 * @param {Promise[]} promises promise实例数组
 * @returns {Promise}
 */
const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    promises.forEach((promise, i) => {
      promise.then(
        (res) => {
          count++;
          result[i] = res;
          if (count === promises.length) {
            return resolve(result);
          }
        },
        (err) => {
          return reject(err);
        }
      );
    });
  });
};

export default promiseAll;
