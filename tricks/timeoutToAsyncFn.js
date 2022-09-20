const timeout = (msec, fn) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timeout');
    timer = null;
  }, msec);

  return (...args) => {
    if (timer) {
      timer = null;
      fn(args);
    }
  };
};

const testFn = (param) => {
  console.log(`Function called with param: ${param}`);
};

const fn100 = timeout(100, testFn);
const fn200 = timeout(200, testFn);

setTimeout(() => {
  fn100('first');
  fn200('second');
}, 150);
