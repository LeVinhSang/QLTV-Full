module.exports = (req, res, next) => {
    let factory = req.app.get('borrower.request');
    factory.makeFromRequest(req.body).then( borrower => {
        req.borrower = borrower;
        req.borrower.setId(req.params.id);
        next();
    });
};