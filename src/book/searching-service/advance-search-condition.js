class AdvanceSearchCondition {

    /**
     *
     * @param {string} title
     * @param {string} genre
     */
    constructor(title, genre) {
        this.title = title;
        this.genre = genre;
    }

    describe(sqlQuery) {
        return sqlQuery.where({'books.deleted_at': null, 'genre': this.genre, 'books.title': this.title});

    }

}

module.exports = AdvanceSearchCondition;
