'use strict';

const sleep = (msec) =>
  new Promise((resolve) => {
    setTimeout(resolve, msec);
  });

console.log('Start sleep');
console.log('Sleep about 3 sec');
sleep(3000).then(() => {
  console.log('After Sleep!');
});
