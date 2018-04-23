const connection = require('../../database');

class BookRepository {

    /**
     *
     * @param {connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    add(book) {
        return this.connection('books').insert({
            title: book.getTitle(),
            author: book.getAuthor(),
            images_book: book.getImages(),
            amount: book.getAmount(),
            publisher_id: book.getPublisher().getId(),
            genre: book.getGenre(),
            published_in: book.getPublished_in()
        });
    }


    edit(book) {
        return this.connection('books').update({
            title: book.getTitle(),
            author: book.getAuthor(),
            images_book: book.getImages(),
            amount: book.getAmount(),
            publisher_id: book.getPublisher().getId(),
            genre: book.getGenre(),
            published_in: book.getPublished_in()
        }).where({id: book.getId()});
    }

    delete(id) {
        return this.connection('books').update({
            deleted_at: new Date()
        }).where({id: id})
    }


}

module.exports = BookRepository;
