Import([
  '[js]/com/Header.js',
  '[js]/com/Footer.js',
  '[html]/layout.html',

  '[js]/pages/Home.js',
  '[js]/pages/NotFound.js',
], function(
  Header, Footer, tpl, Home, NotFound
) {
  const root = document.getElementById('root');
  root.innerHTML = tpl;

  const mainNode = document.getElementById('main');
  const headerNode = document.getElementById('header');
  const footerNode = document.getElementById('footer');

  const header = new Header(headerNode);
  const footer = new Footer(footerNode);

  let page = null;
  if (window.location.pathname === '/') {
    page = new Home(mainNode);
  }

  if(!page) {
    page = new NotFound(mainNode);
  }

});
