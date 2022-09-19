'use strict';

const wrapAsync =
  (callback) =>
  (...args) =>
    setTimeout(() => callback(...args), Math.floor(Math.random() * 1000));

const chain = (prev = null) => {
  const callableChain = () => {
    if (callableChain.prev) {
      callableChain.prev.next = callableChain;
      callableChain.prev();
    } else {
      callableChain.forward();
    }
  };

  callableChain.prev = prev;
  callableChain.fn = null;
  callableChain.args = null;

  callableChain.do = (fn, ...args) => {
    callableChain.fn = fn;
    callableChain.args = args;
    return chain(callableChain);
  };

  callableChain.forward = () => {
    if (callableChain.fn) {
      callableChain.fn(...callableChain.args, (err, data) => {
        if (!err && callableChain.next) {
          callableChain.next.forward();
        } else {
          console.log('End at ' + callableChain.fn.name);
        }
      });
    }
  };

  return callableChain;
};

const readConfig = wrapAsync((name, callback) => {
  console.log('(1) config loaded: ' + name);
  callback(null, { name });
});

const doQuery = wrapAsync((statement, callback) => {
  console.log('(2) SQL query executed: ' + statement);
  callback(null, [{ name: 'Poznan' }, { name: 'Roma' }]);
});

const httpGet = wrapAsync((url, callback) => {
  console.log('(3) Page retrieved: ', url);
  callback(null, '<html>Some web here</html>');
});

const startChain = chain()
  .do(readConfig, 'test-congig')
  .do(doQuery, 'select * from cities')
  .do(httpGet, 'http://sdfd.ua');

startChain();
