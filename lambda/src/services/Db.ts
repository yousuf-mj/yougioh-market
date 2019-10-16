import * as Knex from 'knex';
import Env from '../Env';

export { Knex };

let connection: Knex | null = null;

export default class Db {
    public static knex(): Knex {
        if (!connection) {
            connection = Knex({
                client: 'mysql2',
                connection: {
                    host: Env.mysqlHost,
                    user: Env.mysqlUsername,
                    password: Env.mysqlPassword,
                    database: Env.mysqlDb,
                    port: Env.mysqlPort ? Env.mysqlPort : 3306
                }
            });
        }

        return connection;
    }

    public static async shutdown() {
        await connection.destroy();
        connection = null;
    }
}
