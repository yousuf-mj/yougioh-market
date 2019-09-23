
exports.up = function(knex, Promise) {
      return knex.schema.createTable('card_set', function (table) {
        table.increments('id');
        table.integer('card_id').unsigned().references('cards.id');
        table.integer('set_id').unsigned().references('set.id');
        table.string('code');
        table.string('rarity');
        table.string('image');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card_set');
};
