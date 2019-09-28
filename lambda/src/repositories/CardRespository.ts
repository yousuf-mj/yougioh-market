import Db, { Knex } from '../services/Db';
import Cards from '../types/Cards';

const knex = Db.knex();

export const connect = async () => {
    const all = await knex<Cards>('cards').select('*');
};

export const create = async (cardData: Cards) => {
    return await knex<Cards>('cards').insert(cardData);
};

export const createBulk = async (cardData: any) => {
    return await knex<Cards>('cards').insert(cardData);
};
