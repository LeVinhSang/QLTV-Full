$(document).ready( () => {

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

    $('#home').click( () => {
        $('#book').hide();
        $('#borrowers').show();
    });


    $.get('/api/borrowers').then(renderBorrower);

    function renderBorrower(borrowers) {
        let template = $('#borrowerTemplate').html();
        let resultsHTML = borrowers.map( (borrower) => {
            return template.replace(':bookImages:', borrower.book.images)
                .replace(':borrowerCode:', borrower.code)
                .replace(':borrowerName:', borrower.name_borrower)
                .replace(':bookTitle:', borrower.book.title)
                .replace(':borrowerEmail:', borrower.email)
                .replace(':borrowDate:', borrower.date_borrow)
                .replace(':ReturnDate:',borrower.date_return)
        }).join('');
        $('#list-borrower').html(resultsHTML);
    }

    $('#click-search-basic').click( () => {
        $.get('/api/borrower/search-basic', {
            keyword: $('#input_search').val()
        }).then(renderBorrower)
    });

    $('#search-out-date').click( () => {
        $('#book').hide();
        $('#borrowers').show();
        $.get('/api/borrowers/search-out-date').then(renderBorrower);
    });

    $('#search-books').click( () => {
        $('#book').show();
        $('#borrowers').hide();
        $.get('/api/books').then(renderBook);
    });

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

});