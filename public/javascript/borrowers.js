$(document).ready( () => {

    $('#button-send-mail').hide();
    $('#change-pass').hide();

    $.get('/api/borrowers').then(renderBorrower);

    $.get('/user').then(renderUser);

    function renderUser(users) {
        let template = $('#userTemplate').html();
        let resultsHTML = users.map( user => {
            return template.replace(':bookImages:', user.images);
        }).join('');
        $('#list-user').html(resultsHTML);
    }

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
    });


    $('#button-send-code-mail').click ( () => {
        $('#mail').hide();
        $('#send-code-confirm-mail').show();
        $('#button-send-code-mail').hide();
        $('#button-send-mail').show();
        $('#text').hide();
        $('#send-code-again').show();

        $.get('/user/send-code');
    });

    $('#send-code-again-email').click ( () => {
        $.get('/user/send-code');
    });

    $('#button-send-mail').click( () => {
        $.post('/user/update-mail', {
            code_confirm: $('#input-code-confirm-mail').val(),
            email: $('#new-email').val()
        }).then( data => {
            alert(data);
            if(data === 'success') {
                window.location.href = '/borrowers'
            }
        })
    })

    $('#button-send-code-pass').click ( () => {
        $('#pass').hide();
        $('#pass-again').hide();
        $('#send-code-confirm-pass').show();
        $('#button-send-code-pass').hide();
        $('#change-pass').show();
        $('#text-pass').hide();
        $('#send-code-again-pass').show();

        $.get('/user/send-code');
    });


    $('#send-code-again-pass').click ( () => {
        $.get('/user/send-code');
    });

    //todo phan check new pass and pass again

});