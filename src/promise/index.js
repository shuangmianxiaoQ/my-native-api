const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      // executor是个执行器，构造时立即执行
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;
  value = null;
  resaon = null;
  // 存储成功的回调函数
  onFulfilledCallbacks = [];
  // 存储失败的回调函数
  onRejectedCallbacks = [];

  resolve = (value) => {
    // 只有状态是PENDING时，才执行修改
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
    // 将所有成功的回调拿出来执行
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(value);
    }
  };

  reject = (resaon) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.value = resaon;
    }
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(resaon);
    }
  };

  then(onFulfilled, onRejected) {
    // 为了链式调用，创建一个promise，并返回出去
    const promise = new MyPromise((resolve, reject) => {
      // promise成功执行的函数
      const fulfilled = () => {
        try {
          const result = onFulfilled(this.value);
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const rejected = () => {
        try {
          const result = onRejected(this.resaon);
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilled);
        this.onRejectedCallbacks.push(rejected);
      } else if (this.status === FULFILLED) {
        fulfilled();
      } else if (this.status === REJECTED) {
        rejected();
      }
    });

    return promise;
  }
}

export default MyPromise;
