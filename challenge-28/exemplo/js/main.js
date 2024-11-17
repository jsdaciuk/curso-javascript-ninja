(function () {
  'use strict';

  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/data/data.xml');
  ajax.send();

  console.log('Carregando...');
  var response = '';

  ajax.addEventListener('readystatechange', function () {
    if (isRequestOk(ajax)) {
      try {
        response = JSON.parse(ajax.responseText);
      } catch (e) {
        console.error('Falha ao tentar fazer o parse do JSON', e);
        response = ajax.responseText;
      }
      console.log('Carregado com sucesso!', response);
    }
  }, false);

  function isRequestOk(request) {
    return request.readyState === 4 && request.status === 200;
  }

})()
