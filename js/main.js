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
  document.getElementById('remote-js-img').src = 'img/check.png';
});
