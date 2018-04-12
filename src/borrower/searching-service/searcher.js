const connection       = require('../../../database');
const BorrowerFactory  = require('../borrower-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {BorrowerFactory} factory
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
            .select('borrowers.id', 'borrowers.code', 'borrowers.name_borrower', 'borrowers.email', 'borrowers.book_id', 'borrowers.date_borrow',
                'borrowers.date_return',
                'books.id', 'books.title', 'books.author', 'books.images', 'books.publisher_id', 'books.genre', 'books.published_in',
                'publishers.name', 'publishers.phone', 'publishers.address')
            .from('borrowers')
            .leftJoin('books', function () {
                this.on('book_id', '=', 'books.id')
            })
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            });

        condition.describe(sqlQuery);
        return sqlQuery.then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;

