'use strict';

const sleep = (msc) =>
  new Promise((resolve) => {
    setTimeout(resolve, msc);
  });

(async () => {
  console.log('Before sleep');
  await sleep(3000);
  console.log('After sleep');
})();
