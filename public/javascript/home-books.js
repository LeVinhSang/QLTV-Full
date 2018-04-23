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

    $('#input_search').change( () => {
        $.get('/api/books/search-basic', {
            keyword: $('#input_search').val()
        }).then(renderBook)
    });

    $.get('/api/books').then(renderBook);

    $("#login").click(function(){
        $.post("/login", {
            email: $("#user_name").val(),
            pass: $("#password").val()
        }, function(data) {

            if(data ==='done') {
                window.location.href="/borrowers";
            }
            else {
                alert(data);
            }
        });
    });

});