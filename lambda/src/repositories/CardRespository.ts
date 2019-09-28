import Db, { Knex } from '../services/Db';
import Cards from '../types/Cards';

const knex = Db.knex();

export const findAll = async () => {
    return await knex<Cards>('cards').select('*');
};

export const findByID = async (id: number) => {
    return await knex<Cards>('cards').where('id', id);
};

export const create = async (cardData: Cards) => {
    return await knex<Cards>('cards').insert(cardData);
};

export const createBulk = async (cardData: any) => {
    return await knex<Cards>('cards').insert(cardData);
};

export const del = async (id: number) => {
    return await knex<Cards>('cards')
        .where('id', id)
        .del();
};

export const update = async (id: number, cardData: Cards) => {
    return await knex<Cards>('cards')
        .where('id', id)
        .update(cardData);
};
