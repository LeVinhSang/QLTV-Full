class UserController {

    sendCode(req, res, next) {
        let service = req.app.get('code.service');
        service.sendCode().then(() => {
            res.send({message: 'success'})
        }).catch(next);
    }

    reset(req, res, next) {
        let service = req.app.get('user.service');
        service.resetPass.then( () => {
            res.send({message: 'success'});
        }).catch(next);
    }

    updateMail(req, res, next) {
        let service = req.app.get('user.service');
        service.editMail(req.body.email).then( () => {
            res.send('success');
        }).catch(next);
    }

    updatePass(req, res, next) {
        let service = req.app.get('user.service');
        service.editPass(req.body.password).then( () => {
            res.send('success');
        }).catch(next);
    }

    search(req, res, next) {
        let service = req.app.get('user.provide');
        service.provide().then( user => {
            res.json(user);
        }).catch(next);
    }

}

module.exports = UserController;
