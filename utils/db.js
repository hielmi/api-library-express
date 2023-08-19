import mysql from 'mysql2/promise'

export const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library',
})