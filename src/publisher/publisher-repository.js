const connection    = require('../../database');

class PublisherRepository {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Publisher} publisher
     * @return {Promise <void>}
     */
    add(publisher) {
        return this.connection('publishers').insert({
            name: publisher.getName(),
            phone: publisher.getPhone(),
            address: publisher.getAddress()
        });
    }

    /**
     *
     * @param {Publisher} publisher
     * @return {Promise <void>}
     */
    edit(publisher) {
        return this.connection('publishers').update({
            name: publisher.getName(),
            phone: publisher.getPhone(),
            address: publisher.getAddress()
        }).where({id: publisher.getId()});
    }

    delete(id) {
        return this.connection('publishers').update({
            deleted_at: new Date()
        }).where({id: id});
    }

}

module.exports = PublisherRepository;
