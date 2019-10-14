import Db, { Knex } from '../services/Db';
import Set from '../types/Set';

const knex = Db.knex();

const findAll = async () => {
    return await knex<Set>('set').select('*');
};

const findByID = async (id: number) => {
    return await knex<Set>('set').where('id', id);
};

const create = async (setData: Set) => {
    return await knex<Set>('set').insert(setData);
};

const createBulk = async (setData: any) => {
    return await knex<Set>('set').insert(setData);
};

const del = async (id: number) => {
    return await knex<Set>('set')
        .where('id', id)
        .del();
};

const update = async (id: number, setData: Set) => {
    return await knex<Set>('set')
        .where('id', id)
        .update(setData);
};

export { findAll, findByID, create, createBulk, del, update };
