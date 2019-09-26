import Db, { Knex } from '../services/Db';
import Cards from '../types/Cards';

const knex = Db.knex();

export const connect = async () => {
    const all = await knex<Cards>('cards').select('*');

    console.log(all);
};

export const create = async (cardData: any) => {
    return await knex<Cards>('cards').insert(cardData);
};
