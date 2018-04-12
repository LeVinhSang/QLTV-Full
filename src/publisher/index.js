const PublisherProvider         = require('./publisher-provider');
const PublisherSearcher         = require('./searching-service/searcher');
const PublisherFactory          = require('./publisher-factory');
const PublisherRepository       = require('./publisher-repository');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('publisher.request', new PublisherFactory());
    app.set('publisher.repo', new PublisherRepository(connection));
    app.set('publishers.searcher', new PublisherSearcher(connection, new PublisherFactory));
    app.set('publishers.provider', new PublisherProvider(connection));
};