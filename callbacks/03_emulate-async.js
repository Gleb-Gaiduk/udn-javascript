'use strict';

// Run and see random order

let count = 0;

const callbackCheck = () => {
  if (++count === 4) console.log('All done');
};

// Emulate async calls
const wrapAsync =
  (callback) =>
  (...args) =>
    setTimeout(() => callback(...args), Math.floor(Math.random() * 1000));

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

const readFile = wrapAsync((path, callback) => {
  console.log('(4) Readme file loaded: ', path);
  callback(null, 'file content');
});

readConfig('test-congig', callbackCheck);
doQuery('select * from cities;', callbackCheck);
httpGet('http://sdfd.ua', callbackCheck);
readFile('./test', callbackCheck);
