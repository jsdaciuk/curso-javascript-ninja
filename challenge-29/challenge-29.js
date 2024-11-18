(function ($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function () {

    return {

      init: function () {
        console.log('init');
        this.companyInfo();
        this.initEvents();
      },

      companyInfo: function () {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');

        $image.src = $('[data-js="car-image"]').get().value;
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="car-brand"]').get().value;
        $tdYear.textContent = $('[data-js="car-year"]').get().value;
        $tdPlate.textContent = $('[data-js="car-plate"]').get().value;
        $tdColor.textContent = $('[data-js="car-color"]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');

        if (!app.validateForm()) {
          alert('Por favor, preencha todos os campos do formulário.');
          return;
        }

        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');

        var emptyFields = app.validateForm();
        if (emptyFields.length > 0) {
          alert('Os seguintes campos não foram preenchidos:\n' + emptyFields.join('\n'));
          return;
        }

        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      validateForm: function validateForm() {
        var fields = [
          { name: 'Imagem do carro', value: $('[data-js="car-image"]').get().value.trim() },
          { name: 'Marca / Modelo', value: $('[data-js="car-brand"]').get().value.trim() },
          { name: 'Ano', value: $('[data-js="car-year"]').get().value.trim() },
          { name: 'Placa', value: $('[data-js="car-plate"]').get().value.trim() },
          { name: 'Cor', value: $('[data-js="car-color"]').get().value.trim() }
        ];

        return fields
          .filter(function (field) {
            return field.value === '';
          })
          .map(function (field) {
            return field.name;
          });
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) return;

        var data = JSON.parse(this.responseText);

        var $companyName = $('[data-js="company-name"]').get();
        $companyName.textContent = data.name;

        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyPhone.textContent = data.phone;

      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

    }
  }
  )();

  app.init();

})(window.DOM);
