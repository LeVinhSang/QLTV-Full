class Book {

    /**
     *
     * @param {string} title
     */
    constructor(title) {
        this.title = title;
    }

    /**
     *
     * @return {string|*}
     */
    getTitle() {
        return this.title;
    }

    /**
     *
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     *
     * @return {int|*}
     */
    getId() {
        return this.id;
    }

    /**
     *
     * @param {string} author
     */
    setAuthor(author) {
        this.author = author;
    }

    /**
     *
     * @return {string|*}
     */
    getAuthor() {
        return this.author;
    }

    /**
     *
     * @param {Publisher} publisher
     */
    setPublisher(publisher) {
        this.publisher = publisher;
    }

    /**
     *
     * @return {Publisher|*}
     */
    getPublisher() {
        return this.publisher;
    }

    /**
     *
     * @param {string} genre
     */
    setGenre(genre) {
        this.genre = genre;
    }

    /**
     *
     * @return {string|*}
     */
    getGenre() {
        return this.genre;
    }

    /**
     *
     * @param {int} published_in
     */
    setPublished_in(published_in) {
        this.published_in =  published_in;
    }

    /**
     *
     * @return {int|*}
     */
    getPublished_in() {
        return this.published_in;
    }

    /**
     *
     * @param {string} images
     */
    setImages(images) {
        this.images = images;
    }

    /**
     *
     * @return {string|*}
     */
    getImages() {
        return this.images;
    }

}

module.exports = Book;
