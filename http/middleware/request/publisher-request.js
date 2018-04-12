module.exports = (req, res, next) => {
    let factory = req.app.get('publisher.request');
    req.publisher = factory.makeFromRequest(req.body);
    req.publisher.setId(req.params.id);
    next();
};