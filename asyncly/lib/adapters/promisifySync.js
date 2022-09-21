// Convert sync function to Promise object
//   fn <Function> regular synchronous function
//
// Returns: <Function> Promise-returning function

const promisifySync =
  (fn) =>
  (...args) => {
    try {
      const result = fn(...args);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };
