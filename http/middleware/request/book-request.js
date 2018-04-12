module.exports = (req, res, next) => {
    let factory = req.app.get('book.request');
    factory.makeFromRequest(req.body).then( book => {
        req.book = book;
        req.book.setId(req.params.id);
        next();
    });
};