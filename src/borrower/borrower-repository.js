const connection = require('../../database');

class BorrowerRepository {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    add(borrower) {
        return this.connection('borrowers').insert({
            code: borrower.getCode().getAccount(),
            name_borrower: borrower.getName(),
            book_id: borrower.getBook().getId(),
            date_borrow: new Date().toLocaleString(),
            date_return: borrower.getDateReturn()
        });
    }

    edit(borrower) {
        return this.connection('borrowers').update({
            code: borrower.getCode().getAccount(),
            name_borrower: borrower.getName(),
            book_id: borrower.getBook().getId(),
            date_return: borrower.getDateReturn()
        }).where({id: borrower.getId()});
    }

    delete(id) {
        return this.connection('borrowers').update({
            deleted_at: new Date().toLocaleString()
        }).where({id: id});
    }

    confirm_send_mail(id) {
        return this.connection('borrowers').update({
            send_mail: new Date().toLocaleString()
        }).where({id: id});
    }

}

module.exports = BorrowerRepository;
