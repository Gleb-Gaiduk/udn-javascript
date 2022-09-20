// Convert async function to Promise-returning function
//   fn <Function> callback-last function
//
// Returns: <Function> Promise-returning function

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

const getDataAsync = (...props) => {
  const callback = props.pop();
  const id = props[0];

  if (typeof id !== 'string') callback(new Error('id not provided'));
  else
    setTimeout(() => {
      const data = { id, key: 'Secret key' };
      callback(null, data);
    }, 5000);
};

const getDataAsyncPromise = promisify(getDataAsync);

getDataAsyncPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((reason) => {
    console.log(reason);
  });
