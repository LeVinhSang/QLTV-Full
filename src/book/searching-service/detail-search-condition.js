class DetailSearchCondition {
    /**
     *
     * @param {int} id
     */
    constructor(id) {
        this.id = id;
    }

    describe(sqlQuery) {
        return sqlQuery.where({'books.deleted_at': null, 'books.id': this.id});

    }
}

module.exports = DetailSearchCondition;
