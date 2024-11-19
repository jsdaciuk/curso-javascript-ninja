(function () {
  'use strict'

  // var scope = 'global'

  // function checkScope() {
  //   var scope = 'local'
  //   function func() {
  //     return scope
  //   }
  //   return func;
  // }

  // console.log(checkScope()()) // retorna 'local' (closure)

  var count = 0;

  var increment = (function () {
    var count = 100;
    return (function () {
      var count = 0; // shadowing, irá adotar o escopo mais interno
      return function () {
        return count++
      }
    })();
  })()


  function increment() {
    return count++
  }

  function other() {
    count = 10;
  }

  other();

  console.log(increment()) // 0
  console.log(increment()) // 1
  console.log(increment()) // 2
  console.log(increment()) // 3
  console.log(increment()) // 4

  // var $div = document.querySelector('div')
  // $div.style.width = '100px';
  // $div.style.height = '100px';
  // $div.style.backgroundColor = '#FC0';

  // $div.setAttribute('style', 'width: 500px; height: 600px; background-color: #FC0;')
  // console.log($div)

  var $divContainer = document.querySelector('div')

  $divContainer.addEventListener('click', function () {
    this.classList.remove('container')
  }, false)

})()
