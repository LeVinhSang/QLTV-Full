module.exports = (req, res, next) => {
    if(!req.body.title) {
        return res.send('title must not null');
    }

    if(!req.body.author) {
        return req.body.author = 'anonymous';
    }

    next();
};