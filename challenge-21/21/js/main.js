(function (win, doc) {
  'use strict';

  // joga numa segunda thread
  // document.addEventListener('click', function (e) {
  //   console.log('clicou');
  // }, false);

  // setInterval(() => {
  //   console.log('setTimeout 2 segundo depois');
  // }, 2000);

  var counter = 0;
  var $button = doc.querySelector('[data-js="button"]');
  var temporizador;

  // stop para setTimeout
  // function timer() {
  //   console.log(counter++);
  //   if (counter > 20) return; // para o contador
  //   temporizador = setTimeout(timer, 1000);
  // }

  // timer();

  // $button.addEventListener('click', function () {
  //   clearTimeout(temporizador);
  // }, false);

  // stop para setInterval
  function timer() {
    console.log(counter++)
  }

  temporizador = setInterval(timer, 1000);

  $button.addEventListener('click', function () {
    clearInterval(temporizador);
  }, false);

})(window, document);