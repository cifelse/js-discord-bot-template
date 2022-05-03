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

export const insertAirdropRole = (id, name, batch) => {
    const sql = `INSERT INTO airdrop_roles(batch, role_id, role_name) VALUES(${batch}, '${id}', '${name}');`;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log(res);
            connection.release();
        })
    });
}

export const query = (callback) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        const sql = `SELECT * FROM profiles WHERE id = 7`
        connection.query(sql, (err, res) => {
            if (err) throw err;
            callback(res);
            connection.release();
        })
    });
}

export const getOnePassengerProfile = (id, callback) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        const sql = `SELECT * FROM miles WHERE discord_id = '${id}';`
        connection.query(sql, (err, res) => {
            if (err) throw err;
            callback(res);
            connection.release();
        })
    });
}

export const getTop100PassengerProfiles = (callback) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        const sql = `SELECT discord_id, miles, ROW_NUMBER() OVER (ORDER BY miles DESC) AS 'rank' FROM miles WHERE miles != 0 LIMIT 100;`
        connection.query(sql, (err, res) => {
            if (err) throw err;
            callback(res);
            connection.release();
        })
    });
}

export const getAllPassengerProfiles = (callback) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        const sql = `SELECT * FROM miles;`
        connection.query(sql, (err, res) => {
            if(err) throw err;
            connection.release();
            callback(res);
        })
    });
}
