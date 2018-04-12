class NameSearchCondition {

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    describe(sqlQuery) {
        return sqlQuery.where({
            name: this.name,
            deleted_at: null
        });
    }

}

module.exports = NameSearchCondition;
