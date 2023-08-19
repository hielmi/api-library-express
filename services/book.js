import * as BookRepo from '../repository/book.js';
import { nanoid } from 'nanoid';
import { successResp, errorResp } from '../utils/response.js';

export const getBooks = async (req, res, next) => {
    try {
        const [books] = await BookRepo.getBooks();
        successResp(res, "Success get books", books, 200);
    } catch (err) {
        next(err);
    }
}

export const getBookById = async (req, res, next) => {
    try {
        const book_id = req.params.id;
        const [book] = await BookRepo.getBookById(book_id);
        successResp(res, "Success get book", book, 200);
    } catch (err) {
        next(err);
    }
}

export const addBook = async (req, res, next) => {
    try {
        const { title, writer, pages, is_completed } = req.body
        const book_id = nanoid(6);
        const created_at = Date.now();
        const [result] = await BookRepo.addBook(book_id, title, writer, pages, is_completed, created_at);
        successResp(res, "success add book", { book_id, title, writer, pages, is_completed: is_completed === true ? 1 : 0 }, 201)
    } catch (err) {
        next(err);
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const book_id = req.params.id;
        const { title, writer, pages, is_completed } = req.body
        let updateAt = new Date();
        const [result] = await BookRepo.updateBook(book_id, title, writer, pages, is_completed, updateAt)
        successResp(res, "Book has been changed", { book_id, title, writer, pages, is_completed: is_completed === true ? 1 : 0 }, 200)
    } catch (err) {
        next(err)
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const book_id = req.params.id;
        const [result] = await BookRepo.deleteBook(book_id);
        successResp(res, "Book has been deleted", {}, 200);
    } catch (err) {

    }
}


