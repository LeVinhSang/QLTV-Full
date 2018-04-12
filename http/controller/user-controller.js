class UserController {

    sendCode(req, res, next) {
        let service = req.app.get('code.service');
        service.sendCode().then(() => {
            res.send({message: 'success'})
        }).catch(next);
    }

    reset(req, res, next) {
        let service = req.app.get('user.service');
        service.reset().then( () => {
            res.send({message: 'success'});
        }).catch(next);
    }

    update(req, res, next) {
        let service = req.app.get('user.service');
        service.edit(req.user).then( () => {
            res.send({message: 'success'});
        }).catch(next);
    }

}

module.exports = UserController;
