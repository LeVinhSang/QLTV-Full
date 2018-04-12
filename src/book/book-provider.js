const connection  = require('../../database');
const BookFactory = require('./book-factory');

let bookFactory   = new BookFactory();


class BookProvider {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    provide(id) {
        return this.connection('books').select()
            .where({id: id, deleted_at: null})
            .then( books => bookFactory.makeFromDB(books[0]));
    }

    provideAll() {
        return this.connection('books').select()
            .where({deleted_at: null})
            .then( books => books.map( book => bookFactory.makeFromDB(book)));
    }

}

module.exports = BookProvider;
