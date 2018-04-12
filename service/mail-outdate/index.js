const EmailSender         = require('./mail-sender');
const BorrowerProvider    = require('../../src/borrower/borrower-provider');
const BorrowerRepository  = require('../../src/borrower/borrower-repository');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    let borrowerProvider    = new BorrowerProvider(connection);
    let borrowerRepository  = new BorrowerRepository(connection);
    app.set('email.service', new EmailSender(borrowerProvider, borrowerRepository));
};