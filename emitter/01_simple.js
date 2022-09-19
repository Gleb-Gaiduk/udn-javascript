'use strict';

const EventEmitter = function () {
  this.events = {};
};

EventEmitter.prototype.on = function (name, fn) {
  const handlers = this.events[name];

  if (handlers) {
    handlers.push(fn);
  } else {
    this.events[name] = [fn];
  }
};

EventEmitter.prototype.emit = function (name, ...data) {
  const handlers = this.events[name];

  if (handlers) {
    handlers.forEach((handler) => handler(...data));
  }
};

module.exports = EventEmitter;

const ee = new EventEmitter();

ee.on('event1', (data) => {
  console.log(data);
});

ee.emit('event1', { a: 5 });
