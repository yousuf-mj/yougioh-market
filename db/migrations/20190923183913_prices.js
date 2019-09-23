
exports.up = function(knex, Promise) {
    return knex.schema.createTable('prices', function (table) {
        table.increments('id');
        table.integer('card_set_id').unsigned().references('card_set.id');
        table.decimal('lowest');
        table.decimal('highest');
        table.decimal('average');
        table.decimal('last_sold');
        table.timestamp('created_at');
        table.timestamp('updated_at');

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prices');
};
