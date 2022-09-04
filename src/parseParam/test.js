import parseParam from ".";

const url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

console.log(parseParam(url));
