$(function() {
  //============================================================================
  // Start of re-definitions
  var originalSetAttribute = Element.prototype.setAttribute;

  Element.prototype.setAttribute = function(name, value) {
    if (name === 'src') {
      originalSetAttribute.call(this, name, 'belekas');
    } else {
      originalSetAttribute.call(this, name, value);
    }
  };

  var srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  var originalSrcSetter = srcDescriptor.set;

  srcDescriptor.set = function() {
    originalSrcSetter.call(this, 'belekas');
  };

  Object.defineProperty(HTMLImageElement.prototype, 'src', srcDescriptor);
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
