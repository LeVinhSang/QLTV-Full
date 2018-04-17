$(document).ready( () => {
    function renderBook(books) {
        let template = $('#bookTemplate').html();
        let resultsHTML = books.map( (book) => {
            return template.replace(':bookImages:', book.images)
                .replace(':bookTitle:', book.title)
                .replace(':bookAuthor:', book.author)
                .replace(':bookGenre:', book.genre)
                .replace(':bookPublisher:', book.publisher.name)
                .replace(':bookPublished_in:', book.published_in)
        }).join('');
        $('#books-list').html(resultsHTML);
    }

    $.get('/api/books').then(renderBook);
});