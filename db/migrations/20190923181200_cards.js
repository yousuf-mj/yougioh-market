
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cards', function (table) {
        table.increments('id');
        table.string('name');
        table.unique('name');
        table.string('type');
        table.string('description');
        table.string('archetype');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cards');
};
