const map = (array, cb) => {
  if (typeof array !== 'object' || !Array.isArray(array)) {
    throw new Error('The first param should be an array');
  }

  const length = array.length;
  if (!length) return [];

  const result = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    result[i] = cb(value, i, array);
  }

  return result;
};

console.log(map([1, 2, 3], (value) => value * 2));
