
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function (table) {
        table.string('account').primary();
        table.string('password').notNull();
        table.string('images');
        table.integer('code_confirm');
        table.string('email').notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
};
