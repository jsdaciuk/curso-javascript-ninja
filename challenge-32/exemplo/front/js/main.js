(function () {
  'use strict';

  const ajaxGet = new XMLHttpRequest();
  ajaxGet.open('GET', 'http://localhost:3000/users/john');
  ajaxGet.send();

  ajaxGet.onreadystatechange = function () {
    if (ajaxGet.readyState === 4) {
      console.log(ajaxGet.responseText, ajaxGet.status);
    }
  };

  const ajaxPost = new XMLHttpRequest();
  ajaxPost.open('POST', 'http://localhost:3000/users');
  ajaxPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ajaxPost.send('username=mario&name=Mario Salles&age=34');
  ajaxPost.onreadystatechange = function () {
    if (ajaxPost.readyState === 4) {
      console.log(ajaxPost.responseText, ajaxPost.status);
    }
  };


})();
