const BorrowerFactory           = require('./borrower-factory');
const BorrowerRepository        = require('./borrower-repository');
const BorrowerSearcher          = require('./searching-service/searcher');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('borrower.request', new BorrowerFactory());
    app.set('borrower.repo', new BorrowerRepository(connection));
    app.set('borrowers.searcher', new BorrowerSearcher(connection, new BorrowerFactory()));
};