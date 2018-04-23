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
            return template.replace(':bookImages:', borrower.code.images)
                .replace(':borrowerCode:', borrower.code.account)
                .replace(':borrowerName:', borrower.name_borrower)
                .replace(':bookTitle:', borrower.book.title)
                .replace(':borrowerEmail:', borrower.code.email)
                .replace(':borrowDate:', borrower.date_borrow)
                .replace(':ReturnDate:',borrower.date_return)
        }).join('');
        $('#list-borrower').html(resultsHTML);
    }

    $('#input_search').change( () => {
        $.get('/api/borrowers/search-basic', {
            keyword: $('#input_search').val()
        }).then(renderBorrower)
    });

    $('#search-out-date').click( () => {
        $('#book').hide();
        $('#borrowers').show();
        $.get('/api/borrowers/search-out-date').then(renderBorrower);
    });

});