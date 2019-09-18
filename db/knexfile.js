module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST || "localhost",
            database: "ygo",
            user: "root",
            password: "secret",
            port: process.env.DB_PORT || "3309"
        },
        acquireConnectionTimeout: 4000
    }
};
