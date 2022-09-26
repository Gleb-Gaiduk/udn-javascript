'use strict';

class Coming {
  constructor() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // some async logic
        resolve(this);
      }, 5000);
    });
  }

  sayHi() {
    console.log('Hello world!');
  }
}

(async () => {
  const comingInstance = await new Coming();
  console.dir(comingInstance);
  comingInstance.sayHi();
})();
