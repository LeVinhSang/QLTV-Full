module.exports = (req, res, next) => {
    if(!req.body.code) {
        return res.send('code must not null');
    }

    if(!req.body.name_borrower) {
        return res.send('name must not null');
    }

    if(!req.body.email) {
        return res.send('email must not null');
    }

    if(!req.body.date_return) {
        return res.send('date return must not null');
    }

    if(Date.parse(req.body.date_return) < new Date()) {
        return res.send('date return must > today');
    }

    next();
};