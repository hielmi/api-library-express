import express from 'express';
import * as BookService from '../services/book.js'
import * as UserService from '../services/user.js';
import * as ValidationService from '../services/validation.js';

const routes = express.Router();

// login
routes.post('/login', ValidationService.authUser);
routes.post('/token/:id', ValidationService.refreshAccessToken);

// route for book
routes.get('/books', BookService.getBooks);
routes.get('/books/:id', BookService.getBookById);
routes.post('/books', ValidationService.validateToken, BookService.addBook);
routes.put('/books/:id', ValidationService.validateToken, BookService.updateBook);
routes.delete('/books/:id', ValidationService.validateToken, BookService.deleteBook);

// route for user
routes.get('/users', ValidationService.validateToken, UserService.getUsers);
routes.get('/users/:id', ValidationService.validateToken, UserService.getUserById);
routes.post('/users', UserService.addUser);
routes.put('/users/:id', ValidationService.validateToken, UserService.updateUser);
routes.delete('/users/:id', ValidationService.validateToken, UserService.deleteUser);


export default routes;