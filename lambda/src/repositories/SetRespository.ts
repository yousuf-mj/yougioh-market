import Db, { Knex } from '../services/Db';
import Set from '../types/Set';

const knex = Db.knex();

export const findAll = async () => {
    return await knex<Set>('set').select('*');
};

export const findByID = async (id: number) => {
    return await knex<Set>('set').where('id', id);
};

export const create = async (setData: Set) => {
    return await knex<Set>('set').insert(setData);
};

export const createBulk = async (setData: any) => {
    return await knex<Set>('set').insert(setData);
};

export const del = async (id: number) => {
    return await knex<Set>('set')
        .where('id', id)
        .del();
};

export const update = async (id: number, setData: Set) => {
    return await knex<Set>('set')
        .where('id', id)
        .update(setData);
};
