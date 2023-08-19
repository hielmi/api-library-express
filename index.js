import express from "express";
import routes from './routes/routes.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'

const app = express();
const port = 4000;
const host = 'localhost';


app.use(express.json());

// define routes
app.use(routes);

// error handling middleware
app.use(ErrorHandlingMiddleware);


app.listen(port, host, () => {
    console.log(`server listening on http://${host}:${port}`)
})