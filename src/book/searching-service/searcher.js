const connection       = require('../../../database');
const BookFactory      = require('../book-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {BookFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param  condition
     * @return {Book[]}
     */
    search(condition) {
        let factory = this.factory;
        let sqlQuery = this.connection
            .select('books.id', 'books.title', 'books.author', 'books.images_book', 'books.amount', 'books.publisher_id', 'books.genre', 'books.amount', 'books.published_in',
                'publishers.name', 'publishers.phone', 'publishers.address')
            .from('books')
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            });

        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
