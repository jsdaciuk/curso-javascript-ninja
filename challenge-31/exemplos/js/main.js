(function () {
  'use strict'

  /*
  Relacionado a esse trecho de código:

  <div class="main" data-js="main">
    <h1>Título</h1>
    <p>Paragrafo</p>
  </div>

  var $div = document.querySelector('[data-js="main"]');
  console.log(Object.prototype.toString.call($div));
  console.log(typeof($div));
  console.log($div.innerHTML);
  console.log(typeof $div.innerHTML); //getter

  $div.innerHTML += '<br>'
  $div.innerHTML += '<h2>Titulo 2</h2>'
  var $p = document.createElement('p')
  $p.textContent = 'Paragrafo 2'
  $div.appendChild($p)
*/

  /*
    var $div = document.querySelector('[data-js="main"]');
    var $textarea = document.querySelector('[data-js="textarea"]');
    var $form = document.querySelector('[data-js="form"]');
    $form.addEventListener('submit', function (e) {
      e.preventDefault();
      $div.innerHTML += '<p>' + $textarea.value + '</p>'
      $textarea.focus()
    })

    $form.insertAdjacentHTML('beforebegin', '<h2>Meu formulário - beforebegin</h2>')
    $form.insertAdjacentHTML('afterbegin', '<h2>Meu formulário - afterbegin</h2>')
    $form.insertAdjacentHTML('beforeend', '<h2>Meu formulário - beforeend</h2>')

    $div.insertAdjacentHTML('beforebegin', '<h2>Minha div - beforebegin</h2>')
    $div.insertAdjacentHTML('afterbegin', '<h2>Minha div - afterbegin</h2>')
    $div.insertAdjacentHTML('beforeend', '<h2>Minha div - beforeend</h2>')
    console.dir($form)
    $div.insertAdjacentHTML('afterend', $form.outerHTML)
    $div.insertAdjacentHTML('afterend', `<form action="/" method="get" data-js="form">
                                          <h2>Meu formulário - afterbegin</h2>
                                          <textarea data-js="textarea" rows="10" cols="50"></textarea>
                                          <button data-js="button" type="submit">Enviar</button>
                                          <h2>Meu formulário - beforeend</h2>
                                        </form>`)
    console.log($form.outerHTML)
  */

  // ano mes dia hora minuto segundo milisegundo
  var dateArray = [2018, 2, 1, 12, 0, 0, 0];
  var date = new Date(...dateArray);

  console.log(date)
  console.log(date.getFullYear()); // 2018
  console.log(date.getMonth()); // 2
  console.log(date.getDate()); // 1
  console.log(date.getHours()); // 12
  console.log(date.getMinutes()); // 0
  console.log(date.getSeconds()); // 0
  console.log(date.getMilliseconds()); // 0
  console.log(date.getDay()); // 4, dia da semana
  console.log(date.getTime()); // 1519905600000

  var start = Date.now();
  for (var i = 0; i < 1000000000; i++);
  console.log('elapsed time: ', Date.now() - start);

  // Math Object
  console.log('------------------- Math Object -------------------');
  console.table({
    'PI': Math.PI.toFixed(4),
    'e': Math.E.toFixed(4),
    'abs(-3)': Math.abs(-3),
    'ceil(3.2)': Math.ceil(3.2),
    'floor(3.2)': Math.floor(3.2),
    'round(3.2)': Math.round(3.2).toFixed(4),
    'round(3.5)': Math.round(3.5).toFixed(4),
    'round(3.52)': Math.round(3.52).toFixed(4),
    'round(3.56)': Math.round(3.56).toFixed(4),
    'round(3.6)': Math.round(3.6).toFixed(4),
    'max(1,2,3,4,5)': Math.max(1, 2, 3, 4, 5),
    'min(1,2,3,4,5)': Math.min(1, 2, 3, 4, 5),
    'max([1,2,3,4,5])': Math.max.apply(Math, [1, 2, 3, 4, 5]),
    'random(0, 100000)': (Math.ceil(Math.random()*100000)),
    'cubic(27)': Math.cbrt(27),
    'pow(2,3)': Math.pow(2, 3),
    'truncate(3.955)': Math.trunc(3.955),
    'sign(-3)': Math.sign(-3),
    'cbrt(27)': Math.cbrt(27)
  });

})()
