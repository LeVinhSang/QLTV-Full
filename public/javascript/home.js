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

});