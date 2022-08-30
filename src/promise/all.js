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
