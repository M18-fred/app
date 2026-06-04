Import([
  '[html]/com/footer.html',
], function (tpl) {

  class Footer {
    element = null;

    constructor(element) {
      this.element = element;
      this.element.innerHTML = tpl;
    }
  }

  return Footer;
});
