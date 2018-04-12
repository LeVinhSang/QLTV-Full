const connection          = require('../../database');
const bcrypt              = require('bcrypt');
const saltRounds          = 10;



class UserService {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @return {*|PromiseLike|Promise}
     */
    reset() {
        let connection = this.connection;
        return bcrypt.hash('111111', saltRounds).then(function(hash) {
            return connection('user').update({
                password: hash,
                code_confirm: null
            });
        });
    }

    /**
     *
     * @param {User} user
     * @return {*|PromiseLike|Promise}
     */
    edit(user) {
        return this.connection('user').update({
            password: user.getPassword(),
            email: user.getEmail()
        });
    }

    /**
     *
     * @param {string} code
     * @return {*|PromiseLike|Promise}
     */
    writeCode(code) {
        return this.connection('user').update({
            code_confirm: code
        });
    }

}

module.exports = UserService;

