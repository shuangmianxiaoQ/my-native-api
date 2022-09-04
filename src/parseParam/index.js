const parseParam = (url) => {
  const obj = {};
  const arr = url.split("?")[1].split("&");
  arr.forEach((str) => {
    let [key, val] = str.split("=");
    if (val) {
      val = decodeURIComponent(val);
      val = /\d+$/.test(val) ? Number(val) : val;
      if (obj[key]) {
        obj[key] = [].concat(obj[key], val);
      } else {
        obj[key] = val;
      }
    } else {
      obj[key] = true;
    }
  });

  return obj;
};

export default parseParam;
