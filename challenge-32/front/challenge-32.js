/*
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados,
salvando-os temporariamente na memória de um servidor.

Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para
que possamos utilizar para salvar as informações dos nossos carros.

Para utilizá-lo, você vai precisar fazer o seguinte:

- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.

Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço:
`http://localhost:3000`

O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:

- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.

Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
*/

(function ($) {
  'use strict';

  var app = (function () {

    function init() {
      companyInfo();
      loadCars();
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

      var emptyFields = validateForm();
      if (emptyFields.length > 0) {
        alert('Os seguintes campos não foram preenchidos:\n' + emptyFields.join('\n'));
        return;
      }

      const carData = {
        image: $('[data-js="car-image"]').get().value,
        brandModel: $('[data-js="car-brand"]').get().value,
        year: $('[data-js="car-year"]').get().value,
        plate: $('[data-js="car-plate"]').get().value,
        color: $('[data-js="car-color"]').get().value,
      };

      saveCar(carData);
    }

    function saveCar(carData) {
      var ajax = new XMLHttpRequest();
      ajax.open('POST', 'http://localhost:3000/car', true);
      ajax.setRequestHeader('Content-Type', 'application/json');
      ajax.send(JSON.stringify(carData));
      ajax.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            loadCars();
            resetForm();
            showFeedback('Veículo cadastrado com sucesso!');
          } else if (this.status === 400) { // Supondo que o servidor retorna 400 para placa duplicada
            showFeedback('Erro: já existe um veículo com esta placa.', true);
          }
        }
      }, false);
    }

    function loadCars() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET', 'http://localhost:3000/car', true);
      ajax.send();
      ajax.addEventListener('readystatechange', function () {
        if (isReady.call(this)) {
          updateCarTable(JSON.parse(this.responseText));
        }
      }, false);
    }

    function updateCarTable(cars) {
      var $tableCar = $('[data-js="table-car"]').get();
      $tableCar.innerHTML = '';

      cars.forEach(function (car) {
        var $tr = document.createElement('tr');

        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        $image.src = car.image;
        $tdImage.appendChild($image);

        var $tdBrand = document.createElement('td');
        $tdBrand.textContent = car.brandModel;

        var $tdYear = document.createElement('td');
        $tdYear.textContent = car.year;

        var $tdPlate = document.createElement('td');
        $tdPlate.textContent = car.plate;

        var $tdColor = document.createElement('td');
        $tdColor.textContent = car.color;

        var $tdActions = document.createElement('td');
        var $removeButton = document.createElement('button');
        $removeButton.textContent = 'Remover';
        $removeButton.className = 'btn btn-danger btn-sm';
        $removeButton.addEventListener('click', function () {
          removeCar(car.plate);
        });
        $tdActions.appendChild($removeButton);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdActions);

        $tableCar.appendChild($tr);
      });
    }

    function removeCar(plate) {
      const confirmation = confirm('Tem certeza que deseja remover este veículo?');
      if (!confirmation) return;

      var ajax = new XMLHttpRequest();
      ajax.open('DELETE', `http://localhost:3000/car/${plate}`, true);
      ajax.send();
      ajax.addEventListener('readystatechange', function () {
        if (isReady.call(this)) {
          loadCars();
          showFeedback('Veículo removido com sucesso!');
        }
      }, false);
    }

    function showFeedback(message, isError = false) {
      const feedbackElement = document.getElementById('feedback-message');

      feedbackElement.textContent = message;

      if (isError) {
        feedbackElement.classList.add('alert-danger');
        feedbackElement.classList.remove('alert-success');
      } else {
        feedbackElement.classList.add('alert-success');
        feedbackElement.classList.remove('alert-danger');
      }

      feedbackElement.classList.remove('d-none', 'hide');
      feedbackElement.classList.add('show');

      setTimeout(() => {
        feedbackElement.classList.remove('show');
        feedbackElement.classList.add('hide');
        setTimeout(() => {
          feedbackElement.classList.add('d-none');
        }, 500);
      }, 3000);
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

})(window.DOM);

console.log('Link do pull request do projeto');
console.log('https://github.com/mariocfsalles/curso-javascript-ninja/pull/37');
