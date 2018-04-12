const CodeSender          = require('./code-sender');
const UserService         = require('../../src/user/user-service');
const UserProvider        = require('../../src/user/user-provider');

module.exports = (app) => {
    let connection   = app.get('databaseConnection');
    let userProvider = new UserProvider(connection);
    let userService  = new UserService(connection);
    app.set('code.service', new CodeSender(userProvider, userService));
};