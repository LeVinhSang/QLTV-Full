const connection  = require('../../../database');
const PublisherFactory = require('../publisher-factory');

class Searcher {

    /**
     *
     * @param {connection} connection
     * @param {PublisherFactory} factory
     */
    constructor(connection, factory) {
        this.connection = connection;
        this.factory = factory;
    }

    /**
     *
     * @param condition
     * @return Book[]
     */
    search(condition) {
        let factory  = this.factory;
        let sqlQuery = this.connection
            .select()
            .from('publishers');

        condition.describe(sqlQuery);
        return sqlQuery.then(results => results.map(element => factory.makeFromDB(element)));
    }
}

module.exports = Searcher;
