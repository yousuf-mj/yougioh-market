
exports.up = function(knex, Promise) {
    return knex.schema.createTable('set', function (table) {
        table.increments('id');
        table.string('name');
        table.unique('name');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('set');
};
