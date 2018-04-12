module.exports = (req, res, next) => {
    if(!req.body.name) {
        return res.send('name must not null');
    }

    if(!req.body.address) {
        return res.send('address must not null');
    }

    next();
};