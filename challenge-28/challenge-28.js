(function (DOM) {
  'use strict';

  /*
   No JS:
   - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
   deve ser limpo e enviado somente os números para a requisição abaixo;
   - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
   "	https://cdn.apicep.com/file/apicep/[CEP].json", onde [CEP] será o CEP passado
   no input criado no HTML;
   - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
   com os dados recebidos.
   - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
   a mensagem: "Buscando informações para o CEP [CEP]..."
   - Se não houver dados para o CEP entrado, mostrar a mensagem:
   "Não encontramos o endereço para o CEP [CEP]."
   - Se houver endereço para o CEP digitado, mostre a mensagem:
   "Endereço referente ao CEP [CEP]:"
   - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
   adicionar as informações em tela.
   */

  function app() {

    var $formCEP = new DOM('[data-js="form-cep"]');
    var $inputCEP = new DOM('[data-js="input-cep"]');
    var $logradouro = new DOM('[data-js="logradouro"]');
    var $bairro = new DOM('[data-js="bairro"]');
    var $cidade = new DOM('[data-js="cidade"]');
    var $estado = new DOM('[data-js="estado"]');
    var $cep = new DOM('[data-js="cep-info"]');
    var $status = new DOM('[data-js="status"]');
    var ajax = new XMLHttpRequest();
    $formCEP.on('submit', handleSubmitFormCEP);


    function handleSubmitFormCEP(event) {
      event.preventDefault();
      var url = getUrl();
      ajax.open('GET', url);
      ajax.send();
      getMessageStatus('loading');
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange() {
      if (isRequestOK()) {
        getMessageStatus('ok');
        fillCEPFields();
      }
    }

    function fillCEPFields() {
      var data = parseData();
      if (data.erro) {
        getMessageStatus('error');
        data = {
          logradouro: '-',
          bairro: '-',
          localidade: '-',
          uf: '-',
          cep: '-',
        };
      }

      $logradouro.get()[0].textContent = data.logradouro;
      $bairro.get()[0].textContent = data.bairro;
      $cidade.get()[0].textContent = data.localidade;
      $estado.get()[0].textContent = data.uf;
      $cep.get()[0].textContent = data.cep;
    }

    function getMessageStatus(type) {
      var cep = cleanedCEP().replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
      var message = {
        loading: `Buscando informações para o CEP ${cep}...`,
        ok: `Endereço referente ao CEP ${cep}:`,
        error: `Não encontramos o endereço para o CEP ${cep}.`,
      };
      $status.get()[0].textContent = message[type];
    }

    function parseData() {
      var result;
      try {
        result = JSON.parse(ajax.responseText);
      } catch (e) {
        result = null;
      }
      return result;
    }

    function isRequestOK() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function getUrl() {
      return 'https://viacep.com.br/ws/[CEP]/json/'.replace(
        '[CEP]',
        cleanedCEP()
      );
    }

    function cleanedCEP() {
      return $inputCEP.get()[0].value.replace(/\D/g, '');
    }
  }

  app();
})(window.DOM);
