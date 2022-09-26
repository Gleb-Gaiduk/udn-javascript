const forEach = (array, cb) => {
  if (typeof array !== 'object' || !Array.isArray(array)) {
    throw new Error('First argument should be of the array type');
  }

  const length = array.length;
  if (!length) return [];

  for (let i = 0; i < length; i++) {
    const item = array[i];
    cb(item, i, array);
  }

  return;
};
