import express from "express";

const app = express();
const port = 4000;
const host = 'localhost';

app.listen(port, host, () => {
    console.log(`server listening on http://${host}:${port}`)
})