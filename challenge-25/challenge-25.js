(function () {
  'use strict';

  const dragSource = document.getElementById('drag-source');
  const dropTarget = document.getElementById('drop-target');
  const $video = document.getElementById('media');
  const $log = document.getElementById('log');
  const $button = document.getElementById('clickButton');
  const $textInput = document.getElementById('textInput');
  const $form = document.getElementById('formExample');
  const $status = document.getElementById('status');

  function logEvent(eventName, element) {
    const time = new Date().toLocaleTimeString();
    element.innerHTML += `<p><strong>${time}:</strong> Evento ${eventName} disparado.</p>`;
    element.scrollTop = element.scrollHeight;
  }

  // Drag and Drop Events
  dragSource.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', 'Este texto foi arrastado!');
    console.log('Drag iniciado.');
  });

  dragSource.addEventListener('drag', () => {
    console.log('Arrastando...');
  });

  dropTarget.addEventListener('dragenter', (event) => {
    event.preventDefault();
    console.log('Elemento entrou na área de soltar.');
  });

  dropTarget.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log('Elemento está sobre a área de soltar.');
  });

  dropTarget.addEventListener('dragleave', () => {
    console.log('Elemento deixou a área de soltar.');
  });

  dropTarget.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    dropTarget.textContent = data;
    console.log('Elemento foi solto.');
  });

  dragSource.addEventListener('dragend', () => {
    console.log('Drag and Drop finalizado.');
  });

  // Media Events, removi esse evento 'timeupdate'
  const mediaEvents = [
    'loadstart', 'progress', 'suspend', 'abort', 'error', 'emptied', 'stalled',
    'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing',
    'waiting', 'seeking', 'seeked', 'ended', 'durationchange', 'play', 'pause',
    'ratechange', 'resize', 'volumechange'
  ];

  mediaEvents.forEach(event => {
    $video.addEventListener(event, () => logEvent(event, $log));
  });

  // DOM Events
  document.addEventListener('DOMContentLoaded', () => logEvent('DOMContentLoaded', $status));
  window.addEventListener('afterprint', () => logEvent('afterprint', $status));
  window.addEventListener('beforeprint', () => logEvent('beforeprint', $status));
  window.addEventListener('beforeunload', (event) => {
    logEvent('beforeunload', $status);
    event.preventDefault();
    event.returnValue = '';
  });

  $textInput.addEventListener('blur', () => logEvent('blur', $status));
  $textInput.addEventListener('focus', () => logEvent('focus', $status));
  $textInput.addEventListener('change', () => logEvent('change', $status));
  $button.addEventListener('click', () => logEvent('click', $status));
  $form.addEventListener('submit', (event) => {
    event.preventDefault();
    logEvent('submit', $status);
  });

  window.addEventListener('hashchange', () => logEvent('hashchange', $status));
  
  $textInput.addEventListener('input', () => logEvent('input', $status));
  $form.querySelector('input').addEventListener('invalid', () => logEvent('invalid', $status));
  window.addEventListener('load', () => logEvent('load', $status));
  // window.addEventListener('message', () => logEvent('message', $status));
  window.addEventListener('online', () => logEvent('online', $status));
  window.addEventListener('offline', () => logEvent('offline', $status));
  window.addEventListener('storage', () => logEvent('storage', $status));
  document.addEventListener('visibilitychange', () => logEvent('visibilitychange', $status));

})();
