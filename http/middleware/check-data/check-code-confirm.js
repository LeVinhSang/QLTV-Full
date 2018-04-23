module.exports = (req, res, next) => {
    let user_provide = req.app.get('user.provide');
    user_provide.confirm(req.body.code_confirm, req.body.account).then( value => {
        if(value.length === 0)
            return res.send('mã xác nhận sai hoặc đã hết hạn');
        next();
    })
};