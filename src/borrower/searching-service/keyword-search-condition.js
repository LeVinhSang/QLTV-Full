class KeywordSearchCondition {

    /**
     *
     * @param {string} keyword
     */
    constructor(keyword) {
        this.keyword = keyword;
    }

    /**
     *
     * @param  sqlQuery
     * @return {Borrower[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery.where( function () {
            this.where('borrowers.name_borrower', 'like', '%' + keyword + '%')
                .orWhere('code', 'like', '%' + keyword + '%')
        }).where({'borrowers.deleted_at': null});
    }
}

module.exports = KeywordSearchCondition;
