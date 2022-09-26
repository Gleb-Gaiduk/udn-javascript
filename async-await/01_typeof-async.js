'use strict';

console.log(Function);

const AsyncFunction = (async () => {}).constructor;
console.log(AsyncFunction);

const fn = () => {};
const asyncFn = async () => {};

console.dir({ fn: typeof fn, asyncFn: typeof asyncFn }); // 'function', 'function'

console.log(fn instanceof Function); // true
console.log(asyncFn instanceof Function); // true
console.log(fn instanceof AsyncFunction); // false
console.log(asyncFn instanceof AsyncFunction); // true

console.log(asyncFn.__proto__.constructor); // AsyncFunction
console.log(asyncFn.__proto__.__proto__.constructor); // Function
console.log(asyncFn.__proto__.__proto__.__proto__.constructor); // Object
console.log(asyncFn.__proto__.__proto__.__proto__.__proto__); // null
