
exports.seed = function(knex, Promise) {

    return knex('borrowers').truncate()
        .then(function () {
            return knex('borrowers').insert([
                {code: 1400618, name_borrower: "Lê Vinh Sáng", book_id: 1, date_borrow: "2017-12-10", date_return: "2018-01-05"}
            ]);
        });
};
