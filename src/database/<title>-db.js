import mysql from 'mysql';
import 'dotenv/config';

const pool = mysql.createPool({
    multipleStatements: true,
    connectionLimit: process.env.LIMIT,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PW,
    database: process.env.DB,
});

export const query = (sql, callback) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, res) => {
            if (err) throw err;
            callback(res);
            connection.release();
        })
    });
}