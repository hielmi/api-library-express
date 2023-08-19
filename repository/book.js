import { dbPool } from "../utils/db.js";

export const getBooks = () => {
    const sql = 'SELECT book_id, title, writer, pages, is_completed, created_at, updated_at FROM books LIMIT 1000';

    return dbPool.query(sql);
}

export const getBookById = (id) => {
    const sql = 'SELECT book_id, title, writer, pages, is_completed, created_at, updated_at FROM books WHERE book_id = ?';
    const value = [id]
    return dbPool.query(sql, value);
}

export const addBook = (book_id, title, writer, pages, is_completed, createdAt) => {
    const sql = 'INSERT INTO books (book_id, title, writer, pages, is_completed,created_at) VALUE (?,?,?,?,?,?)';
    const value = [book_id, title, writer, pages, is_completed, createdAt];
    const result = dbPool.query(sql, value);

    return result;
}

export const updateBook = (book_id, title, writer, pages, is_completed, updateAt) => {
    const sql = 'UPDATE books SET title = ? , writer = ?, pages = ?, is_completed = ?, updated_at = ? WHERE book_id = ?'
    const value = [title, writer, pages, is_completed, updateAt, book_id]
    const result = dbPool.query(sql, value)

    return result
}

export const deleteBook = (book_id) => {
    const sql = 'DELETE FROM books WHERE book_id = ?'
    const value = [book_id]
    const result = dbPool.query(sql, value)

    return result
}
