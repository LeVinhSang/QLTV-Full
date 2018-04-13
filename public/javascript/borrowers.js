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
        if( !isValidEmailAddress( $('#new-email').val() ) ) {
            $('#warning-input-email').show();
        }

        else {
            $('#warning-input-email').hide();
            $('#mail').hide();
            $('#send-code-confirm-mail').show();
            $('#button-send-code-mail').hide();
            $('#button-send-mail').show();
            $('#text').hide();
            $('#send-code-again').show();

            $.post('/user/send-code-email', {
                email: $('#new-email').val()
            });
        }

    });

    $('#send-code-again-email').click ( () => {
        $.post('/user/send-code-email', {
            email: $('#new-email').val()
        });
    });


    function isValidEmailAddress(emailAddress) {
        let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };


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
        if( $('#new-pass').val() !== $('#input-again-pass').val()) {
            $('#warning-input-pass-again').show();
        }

        else if( $('#new-pass').val().length < 6) {
            $('#warning-input-pass').show();
        }

        else {
            $('#pass').hide();
            $('#pass-again').hide();
            $('#send-code-confirm-pass').show();
            $('#button-send-code-pass').hide();
            $('#change-pass').show();
            $('#text-pass').hide();
            $('#send-code-again-pass').show();
            $('#warning-input-pass-again').hide();
            $.get('/user/send-code-pass');
        }

    });


    $('#send-code-again-pass').click ( () => {
        $.get('/user/send-code-pass');
    });

    $('#new-pass').change( () => {
        if($('#new-pass').val().length < 6) {
            $('#warning-input-pass').show();
        }
        if($('#new-pass').val().length >= 6) {
            $('#warning-input-pass').hide();
        }
    });

    $('#change-pass').click( () => {
        $.post('/user/update-pass', {
            code_confirm: $('#input-code-confirm-pass').val(),
            password: $('#new-pass').val()
        }).then( data => {
            alert(data);
            if(data === 'success') {
                window.location.href = '/borrowers'
            }
        })
    })


});