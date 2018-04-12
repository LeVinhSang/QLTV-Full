
exports.up = function(knex, Promise) {
    return knex.schema.createTable('borrowers', function (table) {
        table.increments('id');
        table.integer('code').notNull();
        table.string('name_borrower').notNull();
        table.integer('book_id').notNull();
        table.string('email');
        table.string('date_borrow').notNull();
        table.string('date_return').notNull();
        table.date('send_mail');
        table.date('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('borrows');
};
