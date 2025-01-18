'use strict';

function sum(a, b) {
  if (arguments.length !== 2) {
    throw new Error('Invalid number of arguments');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid input');
  }

  if (!isNumber(new Number(a)) || !isNumber(new Number(b))) {
    throw new Error('Invalid input');
  }
  return a + b;
}

function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]';
}

export default sum;
