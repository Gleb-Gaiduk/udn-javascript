// asyncParallelFilter (iterate parallel)
//   items - <Array>, incoming
//   onItemFn - <Function>, to be executed for each value in the array
//     value - <any>, item from items array
//     callback - <Function>
//       err - <Error> | <null>
//       accepted - <boolean>
//   onDoneFn - <Function>, on done
//     err - <Error> | <null>
//     result - <Array>
const asyncParallelFilter = (items, onItemFn, onDoneFn) => {
  if (!Array.isArray(items)) {
    onDoneFn(new Error('First argument should be of an array type'));
    return;
  }

  const length = items.length;
  if (!length) {
    onDoneFn(null, []);
    return;
  }

  let count = 0;
  let suitable = 0;
  const data = new Array(length);
  const rejected = Symbol('rejected');

  const next = (index, err, accepted) => {
    if (!accepted || err) {
      data[index] = rejected;
    } else {
      data[index] = items[index];
      suitable++;
    }

    count++;

    if (count === length) {
      const result = new Array(suitable);

      let pos = 0;

      for (let i = 0; i < length; i++) {
        const value = data[i];
        if (value !== rejected) result[pos++] = value;
      }

      onDoneFn(null, result);
    }
  };

  for (let i = 0; i < length; i++) {
    onItemFn(items[i], next.bind(null, i));
  }
};

const arr = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua'
];

asyncParallelFilter(
  arr,
  (str, callback) => callback(null, str.length <= 2),
  (err, res) => {
    if (err) console.log(err);
    else console.log(res);
  }
);
