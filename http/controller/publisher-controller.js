class PublisherController {

    create(req, res, next) {
        let repo = req.app.get('publisher.repo');
        repo.add(req.publisher).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('publisher.repo');
        repo.edit(req.publisher).then( () => {
            res.send({message: 'success'});
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('publisher.repo');
        repo.delete(req.params.id).then( () => {
            res.send({message: 'success'});
        }).catch(next);
    }

    search(req, res, next) {
        req.app.get('publishers.searcher').search(req.condition)
            .then( publishers => {
                res.send(publishers);
            }).catch(next);
    }
}

module.exports = PublisherController;
