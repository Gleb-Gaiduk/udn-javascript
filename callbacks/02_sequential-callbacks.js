'use strict';

// Sequential calls and sequential execution of 4 pseudo-async functions

const readConfig = (name, callback) => {
  setTimeout(() => {
    console.log('(1) config loaded: ' + name);
    callback(null, { name });
  }, 1000);
};

const doQuery = (statement, callback) => {
  setTimeout(() => {
    console.log('(2) SQL query executed: ' + statement);
    callback(null, [{ name: 'Poznan' }, { name: 'Roma' }]);
  }, 1000);
};

const httpGet = (url, callback) => {
  setTimeout(() => {
    console.log('(3) Page retrieved: ', url);
    callback(null, '<html>Some web here</html>');
  }, 1000);
};

const readFile = (path, callback) => {
  setTimeout(() => {
    console.log('(4) Readme file loaded: ', path);
    callback(null, 'file content');
  }, 1000);
};

console.log('start');

readConfig('myConfig', (err, result) => {});
doQuery('select * from cities', (err, result) => {});
httpGet('http://kpi.ua', (err, result) => {});
readFile('README.md', (err, result) => {});

console.log('end');
