$(document).ready( () => {
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
                .replace(':name::id',"borrower/"+ borrower.id)
                .replace(':name::id',"borrower/"+ borrower.id)
        }).join('');
        $('#list-borrower').html(resultsHTML);
    }

    $('#click-search-basic').click( () => {
        $.get('/api/borrower/search-basic', {
            keyword: $('#input_search').val()
        }).then(renderBorrower)
    });


    function renderBookOfBorrow_books(books) {
        let template = $('#bookTemplate').html();
        let resultsHTML = books.map( (book) => {
            return template.replace(':book.id:', book.id)
                .replace(':book.title:', book.title)
        }).join('');
        $('#list-book').html(resultsHTML);
    }

    $.get('/api/books').then(renderBookOfBorrow_books);

    $('#search-out-date').click( () => {
        $.get('/api/borrowers/search-out-date').then(renderBorrower);
    });

    $('#send-mail').click( () => {
        $.get('/api/borrowers/send-mail').then(alert('success'));
    });

    $('#add').click( () => {

        $.post('/borrower', {
            code: $('#code').val(),
            name_borrower: $('#name_borrower').val(),
            email: $('#email').val(),
            book_id: $('#list-book').val(),
            date_return: $('#date_return').val()
        }).then( (data) => {
            alert(data);
            if(data ==='success'){
                window.location.href='/';
            }
        });
    })

});