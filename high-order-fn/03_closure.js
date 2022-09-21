'use strict';

const fn = (a) => {
  const b = 1;

  return (c) => {
    console.log(a + b + c);
  };
};

const res = fn(2);
res(3);
