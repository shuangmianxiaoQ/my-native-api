// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出

class Scheduler {
  constructor() {
    this.count = 2;
    this.queue = []; // 待运行的任务
    this.runing = []; // 正在运行的任务
  }

  // task是异步函数，返回Promise
  add(task) {
    return new Promise((resolve) => {
      task.resolve = resolve;
      if (this.runing.length < this.count) {
        this.run(task);
      } else {
        this.queue.push(task);
      }
    });
  }

  run(task) {
    this.runing.push(task);
    task().then(() => {
      task.resolve();
      // 删除运行完的任务
      this.runing.splice(this.runing.findIndex(task), 1);
      if (this.queue.length > 0) {
        this.run(this.queue.shift());
      }
    });
  }
}

export default Scheduler;
