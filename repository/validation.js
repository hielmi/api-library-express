import { dbPool } from "../utils/db.js";

export const getUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const result = dbPool.query(sql, [email])
    return result
}

export const getRefreshToken = (user_id) => {
    const sql = 'SELECT * FROM user_tokens WHERE user_id = ?'
    const result = dbPool.query(sql, [user_id])
    return result
}

export const createToken = (user_id, refresh_token, created_at) => {
    const sql = 'INSERT INTO user_tokens (user_id, refresh_token, created_at) VALUE (?,?,?)';
    const values = [user_id, refresh_token, created_at]
    const result = dbPool.query(sql, values)
    return result
}

export const updateRefreshToke = (user_id, refresh_token, updated_at) => {
    const sql = 'UPDATE user_tokens SET refresh_token = ?, updated_at = ? WHERE user_id = ?';
    const values = [user_id, refresh_token, updated_at];
    const result = dbPool.query(sql, values);
    return result;
}