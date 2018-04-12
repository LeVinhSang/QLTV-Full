const connection       = require('../../database');
const PublisherFactory = require('./publisher-factory');
const Publisher        = require('./publisher');


let publisherFactory   = new PublisherFactory();

class PublisherProvider {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    provide(id) {
        return this.connection('publishers').select()
            .where({id: id, deleted_at: null})
            .then( results => {
                if(results.length === 0) {
                    return new Publisher("");
                }
                return publisherFactory.makeFromDB(results[0]);
            });
    }

    provideAll() {
        return this.connection('publishers').select()
            .where({deleted_at: null})
            .then( publishers => publishers.map( publisher => publisherFactory.makeFromDB(publisher)));
    }

}

module.exports =PublisherProvider;
