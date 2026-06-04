Import([
  '[html]/pages/home.html',
], function (tpl) {

  class Home {
    element = null;
    btn = null;
    log = null;
    count = 0;

    constructor(element) {
      this.element = element;
      this.element.innerHTML = tpl;

      this.btn = this.element.querySelector('button');
      this.log = this.element.querySelector('#count');
      this.btn.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
      this.count ++;
      this.log.innerHTML = this.count;
    }
  }

  return Home;
});
