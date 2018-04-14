const BookFactory               = require('./book-factory');
const BookProvider              = require('./book-provider');
const BookRepository            = require('./book-repository');
const BookSearcher              = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('book.request', new BookFactory(app));
    app.set('book.repo', new BookRepository(connection));
    app.set('books.searcher', new BookSearcher(connection, new BookFactory()));
    app.set('books.provider', new BookProvider(connection));

};