const User = require('./user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserFactory {

    /**
     *
     * @param {User} userRaw
     * @return
     */
    make(userRaw) {
        return bcrypt.hash(userRaw.password, saltRounds).then(function(hash) {
            let user = new User(userRaw.account, hash, userRaw.email);
            user.setCode_confirm(userRaw.code_confirm);
            return user;
        });
    }

    makeFromDB(userRaw) {
        let user = new User(userRaw.account, userRaw.password, userRaw.email);
        user.setCode_confirm(userRaw.code_confirm);
        return user;
    }
}

module.exports = UserFactory;
