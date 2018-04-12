const connection       = require('../../database');
const BorrowerFactory  = require('../../src/borrower/borrower-factory');
let factory            = new BorrowerFactory();

class BorrowerProvider {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }
    provide() {
        return this.connection
            .select('borrowers.id', 'borrowers.code', 'borrowers.name_borrower', 'borrowers.email', 'borrowers.book_id', 'borrowers.date_borrow',
                'borrowers.date_return',
                'books.id', 'books.title', 'books.author', 'books.publisher_id', 'books.genre', 'books.published_in',
                'publishers.name', 'publishers.phone', 'publishers.address')
            .from('borrowers')
            .leftJoin('books', function () {
                this.on('book_id', '=', 'books.id')
            })
            .leftJoin('publishers', function () {
                this.on('publisher_id', '=', 'publishers.id')
            })
            .where( function () {
            this.where('borrowers.date_return', '<', new Date())
        }).where({'borrowers.deleted_at': null, 'borrowers.send_mail': null})
            .then( results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = BorrowerProvider;
