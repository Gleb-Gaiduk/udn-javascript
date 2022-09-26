const filter = (array, cb) => {
  if (typeof array !== 'object' || !Array.isArray(array)) {
    throw new Error('First argument should be of the array type');
  }

  const length = array.length;
  const result = [];

  if (!length) return result;

  for (let i = 0; i < length; i++) {
    const value = array[i];

    if (cb(value, i, array)) {
      result.push(value);
    }
  }

  return result;
};
