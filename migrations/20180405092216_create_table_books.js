
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function (table) {
        table.increments('id');
        table.string('title').notNull();
        table.string('author').notNull();
        table.string('images');
        table.integer('publisher_id');
        table.string('genre');
        table.integer('published_in');
        table.date('deleted_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
