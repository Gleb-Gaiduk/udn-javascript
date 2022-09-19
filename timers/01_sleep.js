'use strict';

const sleep = (msec) => {
  const end = new Date().getTime() + msec;
  while (new Date().getTime() < end);
};

console.log('Start sleep');
console.log('Sleep about 3 sec');
sleep(3000);

console.log('Sleep after');
