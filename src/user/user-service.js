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
    resetPass() {
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
     * @param {string} email
     * @return {*|PromiseLike|Promise}
     */
    editMail(email) {
        return this.connection('user').update({
            email: email
        });
    }

    editPass(pass) {
        let connection = this.connection;
        return bcrypt.hash(pass, saltRounds).then(function(hash) {
            return connection('user').update({
                password: hash,
                code_confirm: null
            });
        });
    }


    /**
     *
     * @param {int} code
     * @return {*|PromiseLike|Promise}
     */
    writeCode(code) {
        return this.connection('user').update({
            code_confirm: code
        });
    }

}

module.exports = UserService;

