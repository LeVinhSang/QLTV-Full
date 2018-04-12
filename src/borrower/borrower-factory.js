const Borrower         = require('./borrower');
const BookProvider     = require('../book/book-provider');
const connection       = require('../../database');
const BookFactory      = require('../book/book-factory');


let bookProvider       = new BookProvider(connection);
let bookFactory        = new BookFactory();

class BorrowerFactory {

    makeFromRequest(borrowerRaw) {
        return bookProvider.provide(borrowerRaw.book_id)
            .then( book => {
                let borrower= new Borrower(borrowerRaw.code, book, borrowerRaw.date_borrow, borrowerRaw.date_return);
                    borrower.setName(borrowerRaw.name_borrower);
                    borrower.setEmail(borrowerRaw.email);
                    return borrower;
            });
    }

    makeFromDB(borrowerRaw) {
        let book = bookFactory.makeFromDB(borrowerRaw);
        book.setId(borrowerRaw.book_id);
        let borrower = new Borrower(borrowerRaw.code, book, borrowerRaw.date_borrow, borrowerRaw.date_return);
        borrower.setName(borrowerRaw.name_borrower);
        borrower.setEmail(borrowerRaw.email);
        borrower.setId(borrowerRaw.id);
        return borrower;
    }

}

module.exports = BorrowerFactory;
