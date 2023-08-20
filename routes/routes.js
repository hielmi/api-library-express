import express from 'express';
import * as BookService from '../services/book.js'
import * as UserService from '../services/user.js';

const routes = express.Router();

// route for book
routes.get('/books', BookService.getBooks);
routes.get('/books/:id', BookService.getBookById);
routes.post('/books', BookService.addBook);
routes.put('/books/:id', BookService.updateBook);
routes.delete('/books/:id', BookService.deleteBook);

// route for user
routes.get('/users', UserService.getUsers);
routes.get('/users/:id', UserService.getUserById);
routes.post('/users', UserService.addUser);
routes.put('/users/:id', UserService.updateUser);
routes.delete('/users/:id', UserService.deleteUser);

export default routes;