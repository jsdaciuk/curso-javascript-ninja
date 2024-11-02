(function () {
  'use strict';

  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function (eventType, callback) {
    this.forEach(element => element.addEventListener(eventType, callback, false));
  };

  DOM.prototype.off = function (eventType, callback) {
    this.forEach(element => element.removeEventListener(eventType, callback, false));
  };

  DOM.prototype.get = function () {
    return this.element;
  };

  ['forEach', 'map', 'filter', 'reduce', 'reduceRight', 'every', 'some'].forEach(function (method) {
    DOM.prototype[method] = function () {
      return Array.prototype[method].apply(this.element, arguments);
    };
  });

  ['Array', 'Object', 'Function', 'Number', 'String', 'Boolean', 'Null'].forEach(function (type) {
    DOM['is' + type] = function (param) {
      return Object.prototype.toString.call(param) === `[object ${type}]` || (type === 'Null' && param == null);
    };
  });

  var $a = new DOM('[data-js="link"]');
  var arr = [];
  $a.forEach(function (item) {
    arr.push(item.firstChild.nodeValue);
    console.log(item.firstChild.nodeValue);
  });

  console.log(arr);
  console.log(DOM.isString(arr[0]));
  console.log(DOM.isArray(arr));

})();
