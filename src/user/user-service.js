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
    resetPass(account) {
        let connection = this.connection;
        return bcrypt.hash('111111', saltRounds).then(function(hash) {
            return connection('users').update({
                password: hash,
                code_confirm: null
            }).where({account: account});
        });
    }

    /**
     *
     * @param {string} email
     * @param {string} account
     * @return {*|PromiseLike|Promise}
     */
    editMail(email, account) {
        return this.connection('users').update({
            email: email
        }).where({account: account});
    }

    /**
     *
     * @param {string} pass
     * @param {string} account
     * @returns {*|PromiseLike|Promise}
     */
    editPass(pass, account) {
        let connection = this.connection;
        return bcrypt.hash(pass, saltRounds).then(function(hash) {
            return connection('users').update({
                password: hash,
                code_confirm: null
            }).where({account: account});
        });
    }


    /**
     *
     * @param {int} code
     * @param {string} account
     * @return {*|PromiseLike|Promise}
     */
    writeCode(code, account) {
        return this.connection('users').update({
            code_confirm: code
        }).where({account: account});
    }

}

module.exports = UserService;

