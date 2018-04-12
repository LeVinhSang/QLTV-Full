class BorrowerController {

    create(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.add(req.borrower).then( () => {
            res.send('success');
        }).catch(next);
    }

    update(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.edit(req.borrower).then( () => {
            res.redirect('/');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('borrower.repo');
        repo.delete(req.params.id).then( () => {
            res.redirect('/');
        }).catch(next);
    }

    search(req, res, next) {
        req.app.get('borrowers.searcher').search(req.condition)
            .then( borrowers => {
                res.send(borrowers);
            }).catch(next);
    }

    send(req, res, next) {
        let emailSender = req.app.get('email.service');
        req.app.get('borrowers.searcher').search(req.condition)
            .then( () => {
                emailSender.send()
                    .then( () => res.send('success'));
            }).catch(next);
    }

    renderEditBorrower (req, res, next) {
        let borrowerPromise     = req.app.get('borrowers.searcher').search(req.condition);
        let booksPromise = req.app.get('books.provider').provideAll();
        Promise.all([borrowerPromise, booksPromise])
            .then( values => {
                res.render('edit-borrower.njk', {borrower:values[0][0], books:values[1]})
            })
            .catch(next)
    }


}

module.exports = BorrowerController;

