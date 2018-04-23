const connection  = require('../../database');
const UserFactory = require('./user-factory');
const User        = require('./user');

let userFactory   = new UserFactory();

class UserProvider {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    provideForSendCode(account) {
        return this.connection('users').select()
            .where({account: account})
            .then(results => userFactory.makeFromDB(results[0]));
    }

    provide(account) {
        return this.connection('users').select()
            .where({account: account})
            .then(results => results.map(element => userFactory.makeFromDB(element)));
    }

    confirm(code_confirm, account) {
        return this.connection('users').select()
            .where({code_confirm: code_confirm, account: account})
            .then(value => value);
    }

    /**
     *
     * @param {string} account
     * @return {*|PromiseLike|Promise}
     */
    provideUser(account) {
        return this.connection('users').select()
            .where({account: account})
            .then(results => {
                if(results.length === 0) {
                    return new User("", "", "");
                }
                return userFactory.makeFromDB(results[0])
            });
    }
}

module.exports = UserProvider;
