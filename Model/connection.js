const mysql = require('mysql2/promise');

let connection = null;

async function query(sql, params) {
    await setDatabaseConnction();
    const [results,] = await connection.execute(sql, params);
    return results;
}

async function getLastInsertId(sql, params) {
    await setDatabaseConnction();
    const result = await connection.query(sql, params);
    return result[0].insertId;
}

async function setDatabaseConnction() {
    //Singleton DB connection
    if (null === connection) {
        connection = await mysql.createConnection({
            host: 'database-1.cpeiiyou6r7g.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'richterhightowerlake',
            database: 'mysql'
        });
    }
}

module.exports = {
    query,
    getLastInsertId
}
