'use strict';

const timer = setTimeout(() => {}, 10000);

if (ProcessingInstruction.argv[2] === '--unref') {
  timer.unref();
}

if (ProcessingInstruction.argv[3] === '--ref') {
  timer.ref();
}
