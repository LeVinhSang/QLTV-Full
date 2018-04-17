const express               = require('express');
const router                = express.Router();
const session               = require('express-session');

const PublisherController   = require('../controller/publisher-controller');

const BookController        = require('../controller/book-controller');

const BorrowerController    = require('../controller/borrower-controller');

const UserController        = require('../controller/user-controller');

const checkData             = require('../middleware/check-data');

const dataRequest           = require('../middleware/data-request');


const BookKeywordSearchCondition        = require('../../src/book/searching-service/keyword-search-condition');
const BookUndeletedSearchCondition      = require('../../src/book/searching-service/undeleted-search-condition');
const BookAdvanceSearchCondition        = require('../../src/book/searching-service/advance-search-condition');
const BookDetailSearchCondition             = require('../../src/book/searching-service/detail-search-condition');

const PublisherUndeletedSearchCondition = require('../../src/publisher/searching-service/undeleted-search-condition');
const PublisherNameSearchCondition      = require('../../src/publisher/searching-service/name-search-condition');

const BorrowerUndeletedSearchCondition  = require('../../src/borrower/searching-service/undeleted-search-condition');
const BorrowerKeywordSearchCondition    = require('../../src/borrower/searching-service/keyword-search-condition');
const BorrowerOutdateSearchCondition    = require('../../src/borrower/searching-service/outdate-search-condition');
const BorrowerDetailSearchCondition     = require('../../src/borrower/searching-service/detail-search-condition');


let publisherController = new PublisherController();
let bookController      = new BookController();
let borrowerController  = new BorrowerController();
let userController      = new UserController();


router.use(session({secret: 'uitisawesome'}));

router.get('/', (req, res) => {

    if(req.session.email) {
        res.redirect('/borrowers');
    }
    else {
        res.render('home.njk');
    }
});

router.get('/home/books', (req, res) => {
    res.render('home-books.njk');
});

router.post('/login', checkData.login, (req, res) => {
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    res.end('done');
});

router.get('/logout', (req, res) => {

    req.session.destroy( (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

});

router.get('/borrowers', (req, res) => {
    if(req.session.email) {
        res.render('borrowers.njk');
    }
    else {
        res.redirect('/');
    }
});

router.get('/books', (req, res) => {
    if(req.session.email) {
        res.render('books.njk');
    }
    else {
        res.redirect('/');
    }
});

router.get('/api/borrowers/search-date_return', (req, res, next) => {
    req.condition = new BorrowerOutdateSearchCondition();
    next();
}, borrowerController.send);


router.get('/api/publishers', (req, res, next) => {
    req.condition = new PublisherUndeletedSearchCondition();
    next();
}, publisherController.search);

router.get('/api/publishers/search-advance', (req, res, next) => {
    req.condition = new PublisherNameSearchCondition(req.query.name);
    next();
}, publisherController.search);

router.post('/publisher', checkData.publisher, dataRequest.publisher, publisherController.create);
router.put('/publisher/:id', dataRequest.publisher, publisherController.update);
router.delete('/publisher/:id', publisherController.remove);


router.get('/api/books/search-basic', (req, res, next) => {
    req.condition = new BookKeywordSearchCondition(req.query.keyword);
    next();
}, bookController.search);


router.get('/api/book/:id', (req, res, next) => {
    req.condition = new BookDetailSearchCondition(req.params.id);
    next();
}, bookController.renderEditBook);

router.get('/api/books', (req, res, next) => {
    req.condition = new BookUndeletedSearchCondition();
    next();
}, bookController.search);

router.get('/api/books/search-advance', (req, res, next) => {
    req.condition = new BookAdvanceSearchCondition(req.query.name, req.query.genre);
    next();
}, bookController.search);


router.post('/book', checkData.book, dataRequest.book, bookController.create);
router.post('/edit/book/:id', dataRequest.book, bookController.update);
router.get('/delete/book/:id', bookController.remove);


router.get('/api/borrowers', (req, res, next) => {
    req.condition = new BorrowerUndeletedSearchCondition();
    next();
}, borrowerController.search);

router.get('/api/borrowers/search-basic', (req, res, next) => {
    req.condition = new BorrowerKeywordSearchCondition(req.query.keyword);
    next();
}, borrowerController.search);

router.get('/api/borrowers/send-mail', (req, res, next) => {
    req.condition = new BorrowerOutdateSearchCondition();
    next();
}, borrowerController.send);

router.get('/api/borrowers/search-out-date', (req, res, next) => {
    req.condition = new BorrowerOutdateSearchCondition();
    next();
}, borrowerController.search);

router.get('/api/borrower/:id', (req, res, next) => {
    req.condition = new BorrowerDetailSearchCondition(req.params.id);
    next();
}, borrowerController.renderEditBorrower);

router.post('/borrower', checkData.borrower, dataRequest.borrower, borrowerController.create);
router.post('/edit/borrower/:id', dataRequest.borrower, borrowerController.update);
router.get('delete/borrower/:id', borrowerController.remove);


router.get('/user', userController.search);
router.get('/user/send-code-pass', userController.sendCodePass);
router.post('/user/send-code-email', userController.sendCodeMail);
router.put('/user/reset-pass', checkData.code, userController.reset);
router.post('/user/update-mail', checkData.code, userController.updateMail);
router.post('/user/update-pass', checkData.code, userController.updatePass);


module.exports = router;