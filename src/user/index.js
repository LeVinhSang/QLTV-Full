const UserService               = require('./user-service');
const UserFactory               = require('./user-factory');
const UserProvider              = require('./user-provider');

module.exports = (app) => {
    let connection = app.get('databaseConnection');
    app.set('user.service', new UserService(connection));
    app.set('user.request', new UserFactory());
    app.set('user.provide', new UserProvider(connection));
};