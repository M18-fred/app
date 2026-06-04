Import([
  '[html]/com/header.html',
], function (tpl) {
  class Header {
    element = null;

    constructor(element) {
      this.element = element;
      this.element.innerHTML = tpl;
    }
  }
  return Header;
});
