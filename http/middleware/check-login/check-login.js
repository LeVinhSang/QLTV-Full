const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    let provider = req.app.get('user.provide');
    provider.provideUser(req.body.email).then( user => {
        if(user.account === '')
        {
            return res.send('account or password wrong');
        }

        else {
            bcrypt.compare(req.body.pass, user.password).then( value => {
                if(value === false) {
                    return res.send('account or password wrong');
                }
                next();
            });
        }
    });
};