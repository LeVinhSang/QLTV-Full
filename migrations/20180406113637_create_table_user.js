
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.string('account').primary();
        table.string('password').notNull();
        table.string('images');
        table.string('decentralization');
        table.integer('code_confirm');
        table.string('email').notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
};
