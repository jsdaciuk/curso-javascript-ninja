(function () {
  'use strict';

  /** Seção DOM */
  var $divMain = document.querySelector('[data-js="div-main"]');
  var $main = document.querySelector('.main');

  var $mainHeader = document.querySelector('.main-header');
  var $h1 = $mainHeader.firstElementChild;

  var $mainFooter = document.querySelector('.main-footer');
  $main.replaceChild($mainHeader, $mainFooter);

  var $mainContent = document.querySelector('.main-content');
  var $firstText = $mainContent.firstChild;


  console.log($h1.hasChildNodes());
  $mainHeader.removeChild($h1);


  $mainContent.appendChild($mainHeader); // header.main-header
  $mainContent.insertBefore($mainHeader, $firstText); // header.main-header

  var $cloneMainHeader = $mainHeader.cloneNode(true); // header.main-header
  $mainContent.appendChild($cloneMainHeader); // header.main-header

  console.log($divMain.parentNode); // body
  console.log($main.childNodes) // NodeList(7) [text, header.main-header, text, section.main-content, text, footer.main-footer, text]
  console.log($main.children); // HTMLCollection(3) [header.main-header, section.main-content, footer.main-footer]
  console.log($main.firstElementChild); // header.main-header
  console.log($main.firstChild); // #text
  console.log($main.nextSibling); // #text
  console.log($main.previousSibling); // #text

  console.log($main.firstChild); // #text

  // Node types:
  // 1 - Element
  // 2 - Attribute
  // 3 - Text
  // 8 - Comment
  // 9 - Document
  // 11 - Document fragment
  console.log($main.firstChild.nodeType); // 3

  console.log($mainContent.firstChild.nodeValue); // Texto 1
  console.log($mainContent.firstChild.nodeName); // # text
  console.log($mainContent.firstChild.nextSibling.nodeName); // comment

  console.log($main.hasAttribute('class')); // true
  console.log($main.hasAttribute('data-js')); // true
  console.log($main.hasAttribute('id')); // false

  console.log($mainContent.firstElementChild.hasAttribute('class')); // true
  console.log($mainContent.firstElementChild.hasAttributes()); // true






  /*
  Seção eventos
  */
  function on(element, event, callback) {
    document.querySelector(element)
      .addEventListener(event, callback, false);
  }

  function off(element, event, callback) {
    document.querySelector(element)
      .removeEventListener(event, callback, false);
  }

  function handleClick(message) {
    return function (e) {
      e.preventDefault();
      alert(message);
    };
  }

  const handleClickDiv = handleClick('1º evento de click no div:');
  const handleClickNovoDiv = handleClick('2º evento de click no div:');

  on('[data-js="div"]', 'click', handleClickDiv);
  off('[data-js="div"]', 'click', handleClickDiv);
  on('[data-js="div"]', 'click', handleClickNovoDiv);
  on('[data-js="div"]', 'click', handleClickDiv);

  on('[data-js="link"]', 'click', handleClick('1º evento de click no link'));

  on('[data-js="span"]', 'click', handleClick('1º evento de click no span'));

  on('[data-js="input"]', 'keydown', function () {
    console.log(this.value);
  });

  on('[data-js="select"]', 'change', function () {
    document.querySelector('[data-js="input"]').value = this.value;
  });

  /** Seção debug */

  // var arr = [
  //   { item: 'Arroz', preco: 10, weight: 5 },
  //   { item: 'Feijão', preco: 5, weight: 5 },
  //   { item: 'Macarrão', preco: 7, weight: 5 },
  //   { item: 'Carne', preco: 30, weight: 5 },
  // ];

  // console.table(arr);


  // function sum() {
  //   return Array.prototype.reduce.call(arguments, function (acumulated, actualItem) {
  //     return Number(acumulated) + Number(actualItem);
  //   });
  // }
  // console.log(sum(1, 2, 3, 4, 5));

  //     var myName = 'Mario Salles';
  //     console.log(myName)

  /** Seção ?? */
  //     var obj = {
  //         prop1: {
  //             prop2: {
  //                 prop3: {
  //                     k1: 'v1',
  //                     k2: 'v2',
  //                     k3: 'v3'
  //                 }
  //             }
  //         }
  //     }
  //     console.log(obj.prop1.prop2.prop3);
  //     console.log('----------------');
  //     with (obj.prop1.prop2.prop3) { // a interpretação devido o use stritct é impedida a partir daqui
  //         console.log(k1, k2, k3);
  //     }


  /** Seção ?? */
  //     console.log(this);
  //     function Person(name, lastName, age) {
  //         this.name = name;
  //         this.lastName = lastName;
  //         this.age = age;
  //     }
  //     console.log(new Person('Mario', 'Salles', 43)); // chamada correta
  //     console.log( Person('Mario', 'Salles', 43)); // da erro


  /** Seção ?? */

  //     var var1 = 'Teste';
  //     var obj = {
  //         k1: 'v1',
  //         k1: 'v2',
  //         k3: 'v3'
  //     };
  //     console.log('antes do delete', obj);
  //     console.log(delete obj.k1);
  //     console.log('apos delete: ', obj);
  //     console.log('var1: ', var1);
  //     // console.log('tenta deletar var1', delete var1); // sem o use strict retorna false, com strict nem interpreta


  /** Seção 22 */


  // function myFunction(a, b, c) {
  //     console.log(a, b, c);
  // }

  // function myFunction2(a, b, c) {
  //     console.log(this.lastName, a, b, c);
  // }

  // console.log('myfunc length, retorna o \nnumero de argumentos da função: ', myFunction.length);

  // var arr = [1, 2, 3, 4, 5];
  // var obj = { prop1: 1, prop2: 2, prop3: 3 };

  // console.log('array: ', arr);
  // console.log('array to string', arr.toString());

  // console.log('obj: ', obj);
  // console.log('obj to string', obj.toString());

  // console.log('myFunction to string', myFunction.toString());

  // console.log('myFunction call:');
  // myFunction.call(myFunction, 1, 2, 3); // chama a função com o this apontando para a função

  // console.log('myFunction2 call com this obj e arr:');
  // myFunction2.call({ lastName: 'Call 1' }, [1, 2, 3, 4, 5, 6]);

  // console.log('myFunction2 call com this obj e ...arr:');
  // myFunction2.call({ lastName: 'Call...' }, ...[1, 2, 3, 4, 5, 6]);

  // console.log('myFunction2 apply com this obj e arr:');
  // myFunction2.apply({ lastName: 'Apply' }, [1, 2, 3, 4, 5, 6]);

  // function MyFunction3(name, lastName) {
  //     this.name = name;
  //     this.lastName = lastName;
  //     this.age = 43;
  // }

  // MyFunction3.prototype.fullName = function () {
  //     return this.name + ' ' + this.lastName;
  // }

  // var mario = new MyFunction3('Mario', 'Salles');
  // console.log(mario.fullName());

  // MyFunction3.prototype.age = 40;
  // console.log(mario.age);

  // function ArrayElements() {
  //     var result = Array.prototype.reduce.call(
  //         arguments,
  //         function (accu, curr, _) {
  //             return accu + curr;
  //         },
  //     );
  //     console.log(result);
  // }

  // ArrayElements(1, 2, 3, 4, 5, 6, 7, 8);

  // function ArrayLikeFunc() {
  //     console.log(arguments);
  // }
  // ArrayLikeFunc(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);




})()
// console.log(myName);
