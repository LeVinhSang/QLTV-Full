const Borrower         = require('./borrower');
const BookFactory      = require('../book/book-factory');
const UserFactory      = require('../user/user-factory');

let bookFactory        = new BookFactory();
let userFactory        = new UserFactory();

class BorrowerFactory {

    constructor(app) {
        this.app = app;
    }

    makeFromRequest(borrowerRaw) {
        let userProvider = this.app.get('user.provide');
        let user = userProvider.provide(borrowerRaw.code);
        let bookProvider = this.app.get('books.provider');
        let book = bookProvider.provide(borrowerRaw.book_id);

        return Promise.all([user, book]).then( values => {
            let borrower= new Borrower(values[0], values[1], borrowerRaw.date_borrow, borrowerRaw.date_return);
            borrower.setName(borrowerRaw.name_borrower);
            return borrower;
        });
    }

    makeFromDB(borrowerRaw) {
        let book = bookFactory.makeFromDB(borrowerRaw);
        let user = userFactory.makeFromDB(borrowerRaw);
        book.setId(borrowerRaw.book_id);
        let borrower = new Borrower(user, book, borrowerRaw.date_borrow, borrowerRaw.date_return);
        borrower.setName(borrowerRaw.name_borrower);
        borrower.setId(borrowerRaw.id);
        return borrower;
    }

}

module.exports = BorrowerFactory;
