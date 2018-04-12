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

    provide() {
        return this.connection('user').select().then(results => userFactory.make(results[0]));
    }

    confirm(code_confirm) {
        return this.connection('user').select().where({code_confirm: code_confirm}).then(value => value);
    }

    /**
     *
     * @param {string} account
     * @return {*|PromiseLike|Promise}
     */
    provideUser(account) {
        return this.connection('user').select()
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
