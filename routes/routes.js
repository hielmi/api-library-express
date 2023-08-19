import express from 'express';
import * as BookService from '../services/book.js'

const routes = express.Router();

// route for book
routes.get('/books', BookService.getBooks);
routes.get('/books/:id', BookService.getBookById);
routes.post('/books', BookService.addBook);
routes.put('/books/:id', BookService.updateBook);
routes.delete('/books/:id', BookService.deleteBook);

export default routes;