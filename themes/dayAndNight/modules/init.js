/* @group NIGHT MODE */
function checkNightMode() {
  if (getCookie('nightMode') == 'true') {
    document.body.classList.toggle('night')
  }
}
function nightMode() {
  setCookie('nightMode', document.body.classList.toggle('night'), 9999999);
}
/* @group COOKIE */
function getCookie(name) {
  var i, x, y, values = document.cookie.split('; ');
  for (i = 0; i < values.length; i++) {
    x = values[i].substr(0, values[i].indexOf('='));
    y = values[i].substr(values[i].indexOf('=') + 1);
    x = x.replace(/^\\s+|\s+$/g, '');
    if (x == name) {
      return decodeURIComponent(y.replace(/\\+/g, ' '));
    }
  }
  return '';
}
function setCookie(name, value, days) {
  clearCookie(name);
  createCookie(name, value, days);
}
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  }
  else {
    expires = '';
  }
  window.parent.document.cookie = name + '=' + value + expires + '; path=/';
}
function clearCookie(name) {
  createCookie(name, '', -1);
}
/* @end COOKIE */
/* @group CSS */
function showPage() {
  window.setTimeout(function () {
    document.body.style.opacity = '1'
  }, 100);
}
function addTransitionCSS() {
  window.setTimeout(function () {
    addTransitionCSSTimeout()
  }, 100);
}
function addTransitionCSSTimeout() {
  var sheets = document.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].href && sheets[i].href.indexOf('index.css') != -1) {
      sheets[i].insertRule('body,aside.night-toggle{transition:background .6s}', sheets[i].cssRules.length);
    }
  }
}