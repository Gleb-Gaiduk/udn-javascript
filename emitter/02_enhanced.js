'use strict';

const events = require('events');

const emitter = () => {
  const ee = new events.EventEmitter();
  const emit = ee.emit;

  ee.emit = (...args) => {
    if (args[0] !== '*') {
      emit.apply(ee, args);
    }
    args.unshift('*');
    emit.apply(ee, args);
  };
  return ee;
};

module.exports = emitter;

const ee = emitter();

ee.on('event1', (data) => {
  console.log('event 1', data);
});

ee.on('*', (name, data) => {
  console.log('Any event');
  console.log([name, data]);
});

ee.emit('event1', { a: 5 });
ee.emit('event2', { a: 500 });
ee.emit('*', { a: 1000 });
