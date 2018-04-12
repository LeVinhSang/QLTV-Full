class UndeletedSearchCondition {

    /**
     *
     * @param sqlQuery
     * @return {Publisher[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where({deleted_at: null})
    }
}

module.exports = UndeletedSearchCondition;
