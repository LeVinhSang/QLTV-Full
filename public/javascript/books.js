$(document).ready( () => {
    $.get('/api/books').then(renderBook);

    function renderBook(books) {
        let template = $('#bookTemplate').html();
        let resultsHTML = books.map( (book) => {
            return template.replace(':bookImages:', book.images)
                .replace(':bookTitle:', book.title)
                .replace(':bookAuthor:', book.author)
                .replace(':bookGenre:', book.genre)
                .replace(':bookPublisher:', book.publisher.name)
                .replace(':bookPublished_in:', book.published_in)
                .replace(':name::id', 'book/'+book.id)
                .replace(':name::id', 'book/'+book.id)
        }).join('');
        $('#books-list').html(resultsHTML);
    }

    function renderPublisher(publishers) {
        let template = $('#publisherTemplate').html() ;
        let resultsHTML = publishers.map( publisher => {
            return template.replace(':publisher.id:', publisher.id)
                .replace(':publisher.name:', publisher.name)
        }).join('');
        $('#list-publisher').html(resultsHTML);
    }

    $.get('/api/publishers').then(renderPublisher);

    $('#input_search').change( () => {
        $.get('/api/books/search-basic', {
            keyword: $('#input_search').val()
        }).then(renderBook);
    });

    $('#add').click( () => {
        $.post('/book', {
            title: $('#title').val(),
            author: $('#author').val(),
            images: $('#images').val(),
            publisher_id: $('#list-publisher').val(),
            genre: $('#genre').val(),
            published_in: $('#published_in').val()
        }).then( data => {
            alert(data);
            if(data === 'success') {
                window.location.href = '/books'
            }
        });
    });

    $('#add-publisher').click( () => {
        $.post('/publisher', {
            name: $('#name').val(),
            phone: $('#phone').val(),
            address: $('#address').val()
        }).then( (data) => {
            alert(data);
            if(data === 'success') {
                window.location.href = '/books'
            }
        })
    });

});