(function ($) {
  'use strict';

  var app = (function () {

    function init() {
      console.log('init');
      companyInfo();
      initEvents();
    }

    function companyInfo() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET', '/company.json', true);
      ajax.send();
      ajax.addEventListener('readystatechange', getCompanyInfo, false);
    }

    function initEvents() {
      $('[data-js="form-register"]').on('submit', handleSubmit);
    }

    function handleSubmit(e) {
      e.preventDefault();
      console.log('submit');

      var emptyFields = validateForm();
      if (emptyFields.length > 0) {
        alert('Os seguintes campos não foram preenchidos:\n' + emptyFields.join('\n'));
        return;
      }

      var $tableCar = $('[data-js="table-car"]').get();
      $tableCar.appendChild(createNewCar());
      resetForm();
    }

    function createNewCar() {
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

      $fragment.appendChild($tr);
      return $fragment;
    }

    function validateForm() {
      var fields = [
        { name: '- Imagem do carro', value: $('[data-js="car-image"]').get().value.trim() },
        { name: '- Marca', value: $('[data-js="car-brand"]').get().value.trim() },
        { name: '- Ano', value: $('[data-js="car-year"]').get().value.trim() },
        { name: '- Placa', value: $('[data-js="car-plate"]').get().value.trim() },
        { name: '- Cor', value: $('[data-js="car-color"]').get().value.trim() }
      ];

      return fields
        .filter(function (field) {
          return field.value === '';
        })
        .map(function (field) {
          return field.name;
        });
    }

    function getCompanyInfo() {
      if (!isReady.call(this)) return;

      var data = JSON.parse(this.responseText);

      var $companyName = $('[data-js="company-name"]').get();
      $companyName.textContent = data.name;

      var $companyPhone = $('[data-js="company-phone"]').get();
      $companyPhone.textContent = data.phone;
    }

    function isReady() {
      return this.readyState === 4 && this.status === 200;
    }

    function resetForm() {
      $('[data-js="form-register"]').get().reset();
    }

    return {
      init: init
    };
  })();

  app.init();

  console.log('https://github.com/mariocfsalles/curso-javascript-ninja/pull/34');

})(window.DOM);
