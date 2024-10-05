(function (win, doc) {
  'use strict';

  // if (win === window) console.log('Estou no escopo global'); 
  // win.alert('Olá, seja bem-vindo!');


  // if (prompt('Pergunta?') === 'resposta') console.log('Acertou!');
  // else console.log('Errou!');

  // var del = confirm('Deseja realmente excluir?');
  // if (del) console.log('Excluído com sucesso!', del);
  // else console.log('Ação cancelada pelo usuário!');

  // console.log(doc.getElementsByClassName('my-link'));
  // console.log(doc.getElementsByTagName('a'));
  // console.log(doc.getElementsByTagName('p'));

  // console.log(doc.getElementsByName('username'));
  // console.log(doc.getElementsByName('password'));

  // var $inputs = doc.getElementsByTagName('input');
  // console.log($inputs);

  // console.log(doc.querySelectorAll('input[type="text"]'));
  // console.log(doc.querySelectorAll('input.input[type="password"]'));
  // console.log(doc.querySelectorAll('#password'));

  var $inputUsername = doc.querySelector('#username');
  var $inputPassword = doc.querySelector('#password');
  // console.log($inputUsername.value, $inputPassword.value);

  // $inputUsername.value = 'Mario Salles';
  // $inputPassword.value = '123456';
  // console.log($inputUsername.value, $inputPassword.value);
  var $button = doc.querySelector('#button');

  $button.addEventListener('click', function(event){
    event.preventDefault();
    console.log('Clicou no botão', event);
  },false)

  $inputUsername.addEventListener('click', function(event){
    event.preventDefault();
    win.alert('Clicou no input de username');
  })


})(window, document);