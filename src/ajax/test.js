import ajax from ".";

ajax({
  type: "get",
  url: "https://jsonplaceholder.typicode.com/todos/1",
  success: (text) => {
    console.log(text);
  },
  fail: (status) => {
    console.error(status);
  }
});

ajax({
  type: "POST",
  url: "https://jsonplaceholder.typicode.com/posts",
  data: "",
  success: (text) => {
    console.log(text);
  },
  fail: (status) => {
    console.error(status);
  }
});
