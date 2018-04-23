class Borrower {

    /**
     *
     * @param {User} code
     * @param {Book} book
     * @param {string} date_borrow
     * @param {string} date_return
     */
    constructor(code, book, date_borrow, date_return) {
        this.code = code;
        this.book = book;
        this.date_borrow = date_borrow;
        this.date_return = date_return;
    }

    /**
     *
     * @return {User}
     */
    getCode() {
        return this.code;
    }

    /**
     *
     * @return {Book|*}
     */
    getBook() {
        return this.book;
    }

    /**
     *
     * @return {string|*}
     */
    getDateBorrow() {
        return this.date_borrow;
    }

    /**
     *
     * @return {string|*}
     */
    getDateReturn() {
        return this.date_return;
    }

    /**
     *
     * @param {string} name_borrower
     */
    setName(name_borrower) {
        this.name_borrower = name_borrower;
    }

    /**
     *
     * @return {string|*}
     */
    getName() {
        return this.name_borrower;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @return {int|*}
     */
    getId() {
        return this.id;
    }
}

module.exports = Borrower;
