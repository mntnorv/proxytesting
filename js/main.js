$(function() {
  //============================================================================
  // Start of re-definitions
  var originalSetAttribute = Element.prototype.setAttribute;

  Element.prototype.setAttribute = function(name, value) {
    if (name === 'src') {
      originalSetAttribute.call(this, name, 'img/cross.png');
    } else {
      originalSetAttribute.call(this, name, value);
    }
  };

  var srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  var originalSrcSetter = srcDescriptor.set;

  srcDescriptor.set = function() {
    originalSrcSetter.call(this, 'img/cross.png');
  };

  Object.defineProperty(HTMLImageElement.prototype, 'src', srcDescriptor);

  var htmlDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  var originalHtmlSetter = htmlDescriptor.set;

  htmlDescriptor.set = function() {
    originalHtmlSetter.call(this, '<img src="img/cross.png" />');
  };

  Object.defineProperty(Element.prototype, 'innerHTML', htmlDescriptor);

  var originalXMLHttpOpen = window.XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    return originalXMLHttpOpen.call(this, method, 'partials/cross.html');
  };
  // End of re-definitions
  //============================================================================

  $('#remote-jquery-img').attr('src', 'img/check.png');
  $('#remote-jquery-create-img').append($('<img src="img/check.png" />'));
  $.get('partials/check.html', function (data) {
    $('#remote-jquery-ajax-img').html(data);
  });

  document.getElementById('remote-js-img').src = 'img/check.png';

  function reqListener () {
    document.getElementById('remote-js-ajax-img').innerHTML =
      this.responseText;
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', 'partials/check.html');
  oReq.send();
});
