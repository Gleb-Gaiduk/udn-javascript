'use strict';

const fn = (par, callback) => {
  if (!par) {
    callback(new Error('Parameter needed'));
  }

  callback(null, 'Data ' + par);
  return 'Value';
};

const res = fn('example', (err, data) => {
  if (err) throw err;
  console.log({ data });
});

console.log({ res });
