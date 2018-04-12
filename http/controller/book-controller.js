class BookController {

    create(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.add(req.book).then( () => {
            res.send('success');
        }).catch(next)
    }

    update(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.edit(req.book).then( () => {
            res.redirect('/books');
        }).catch(next);
    }

    remove(req, res, next) {
        let repo = req.app.get('book.repo');
        repo.delete(req.params.id).then( () => {
            res.redirect('/books');
        }).catch(next);
    }

    search(req, res, next) {
        let repo = req.app.get('books.searcher');
        repo.search(req.condition).then( books => {
            res.json(books);
        }).catch(next);
    }

    renderEditBook (req, res, next) {
        let booksPromise     = req.app.get('books.searcher').search(req.condition);
        let publisherPromise = req.app.get('publishers.provider').provideAll();
        Promise.all([booksPromise, publisherPromise])
            .then( values => {
                res.render('edit-book.njk', {book:values[0][0], publishers:values[1]})
            })
            .catch(next)
    }
}

module.exports = BookController;
