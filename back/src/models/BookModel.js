const Database = require('../core/Database');

class BookModel {
  getBookById(id){
    return Database.get('books', id);
  }

  createBook(title, authors) {
    const file = Database.getFile('books');
    const id = file ? file.length : 0;
    Database.edit('books', id, { id, title, authors });
    return id;
  }

  editBook(id, book) {
    const oldBook = Database.get('books', id);
    if(oldBook) {
      Database.edit('books', id, {...oldBook, ...book});
      return Database.get('books', id);
    }
    return false;
  }
    deleteBook(id) {
    const oldBook = Database.get('books', id);
    if(oldBook) {
      Database.delete('books', id);
      return true;
    }
    return false;
  }
}

module.exports = new BookModel();