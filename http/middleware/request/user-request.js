module.exports = (req, res, next) => {
    let factory = req.app.get('user.request');
    factory.make(req.body).then( user => {
        req.user = user;
        next();
    });
};