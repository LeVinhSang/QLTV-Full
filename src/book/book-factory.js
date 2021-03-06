const Book                = require('./book');
const PublisherProvider   = require('../publisher/publisher-provider');
const connection          = require('../../database');
const PublisherFactory    = require('../publisher/publisher-factory');


let publisherProvider     = new PublisherProvider(connection);
let publisherFactory      = new PublisherFactory();

class BookFactory {

    makeFromRequest(bookRaw) {
        let book = new Book(bookRaw.title);
        book.setAuthor(bookRaw.author);
        book.setPublished_in(bookRaw.published_in);
        book.setGenre(bookRaw.genre);
        book.setId(bookRaw.id);
        book.setImages(bookRaw.images);
        return publisherProvider.provide(bookRaw.publisher_id)
            .then( publisher => {
                book.setPublisher(publisher);
                return book;
            });
    }

    makeFromDB(bookRaw) {
        let book = new Book(bookRaw.title);
        book.setAuthor(bookRaw.author);
        book.setImages(bookRaw.images);
        book.setPublished_in(bookRaw.published_in);
        book.setGenre(bookRaw.genre);
        let publisher = publisherFactory.makeFromDB(bookRaw);
        publisher.setId(bookRaw.publisher_id);
        book.setPublisher(publisher);
        book.setId(bookRaw.id);
        return book;
    }
}

module.exports = BookFactory;
