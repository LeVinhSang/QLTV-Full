module.exports = (req, res, next) => {
    let user_provide = req.app.get('user.provide');
    user_provide.confirm(req.body.code_confirm).then( value => {
        if(value.length === 0)
            return res.send({message: 'mã xác nhận sai hoặc đã hết hạn'});
        next();
    })
};