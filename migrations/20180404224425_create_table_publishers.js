
exports.up = function(knex, Promise) {
    return knex.schema.createTable('publishers', function (table) {
        table.increments('id');
        table.string('name').notNull();
        table.integer('phone');
        table.string('address');
        table.date('deleted_at');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('publishers');
};
