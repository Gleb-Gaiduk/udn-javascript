'use strict';

const fn = () => {
  const cache = {};

  return (a) => {
    let res = cache[a];

    if (res) {
      return res;
    } else {
      res = a;
      cache[a] = res;

      return res;
    }
  };
};
