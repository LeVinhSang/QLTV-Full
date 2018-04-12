class DetailSearchCondition {
    /**
     *
     * @param {int} id
     */
    constructor(id) {
        this.id = id;
    }

    describe(sqlQuery) {
        return sqlQuery.where({'borrowers.deleted_at': null, 'borrowers.id': this.id});

    }
}

module.exports = DetailSearchCondition;
