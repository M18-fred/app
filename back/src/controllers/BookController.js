const BookModel = require('../models/BookModel');

class BookController {
  getBook(query, json, body) {
    if(query && query.id) {
      const id = parseInt(query.id, 10);
      if(!Number.isNaN(id)) {
        return BookModel.getBookById(id);
      }
    }
    return false;
  }

    postBook(query, json, body) {
    if(body && body.title && body.authors){
      return BookModel.createBook(body.title, body.authors);
    }
    return false;
    }

  patchBook(query, json, body) {
    if(query && query.id){
      return BookModel.editBook(query.id,body);
    }
    return false;
  }
  putBook(query, json, body){
    if(query && query.id){
      return BookModel.editBook(query.id,body);
  }
  return false;
  }
  DeleteBook(query, json, body){
    if(query && query.id){
      return BookModel.deleteBook(query.id);
  }
  return false;
  }
  routes = [
    { url: 'api/book/', handler: this.getBook, method: 'GET' },
    { url: 'api/book/', handler: this.postBook, method: 'POST' },
    { url: 'api/book/', handler: this.putBook, method: 'PUT' },
    { url: 'api/book/', handler: this.patchBook, method: 'PATCH' },
    { url: 'api/book/', handler: this.DeleteBook, method: 'DELETE' }
  ];
}

module.exports = new BookController();