import express from 'express';
import * as BookService from '../services/book.js'
import * as ValidationService from '../services/validation.js';

const routes = express.Router();

// login
routes.post('/login', ValidationService.authUser);

// route for book
routes.get('/books', BookService.getBooks);
routes.get('/books/:id', BookService.getBookById);
routes.post('/books', BookService.addBook);
routes.put('/books/:id', BookService.updateBook);
routes.delete('/books/:id', BookService.deleteBook);

// route for auth
routes.post('/token/:id', ValidationService.refreshAccessToken);

export default routes;