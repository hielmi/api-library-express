import { dbPool } from "../utils/db.js";

export const getData = () => {
    const sql = 'SELECT user_id, name, email, created_at, updated_at FROM users LIMIT 1000';

    return dbPool.query(sql);
}

export const getDataById = (id) => {
    const sql = 'SELECT user_id, name, email, created_at, updated_at FROM users WHERE user_id = ?';
    const value = [id]
    return dbPool.query(sql, value);
}

export const createData = (user_id, name, email, password, createdAt) => {
    const sql = 'INSERT INTO users (user_id, name, email, password, created_at) VALUE (?,?,?,?,?)';
    const value = [user_id, name, email, password, createdAt];
    const result = dbPool.query(sql, value);

    return result;
}

export const updateData = (id, name, email, updateAt) => {
    const sql = 'UPDATE users SET name = ? , email = ?, updated_at = ? WHERE user_id = ?'
    const value = [name, email, updateAt, id]
    const result = dbPool.query(sql, value)

    return result
}

export const deleteData = (id) => {
    const sql = 'DELETE FROM users WHERE user_id = ?'
    const value = [id]
    const result = dbPool.query(sql, value)

    return result
}

export const getUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const value = [email]
    const result = dbPool.query(sql, value)

    return result
}

export const updateToken = (id, token) => {
    const sql = 'UPDATE users SET user_token = ? WHERE user_id = ?'
    const value = [token, id]
    const result = dbPool.query(sql, value)

    return result
}