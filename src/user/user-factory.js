const User = require('./user');

class UserFactory {

    makeFromDB(userRaw) {
        let user = new User(userRaw.account, userRaw.password, userRaw.email);
        user.setImages(userRaw.images);
        user.setCode_confirm(userRaw.code_confirm);
        return user;
    }
}

module.exports = UserFactory;
