import express, { json } from 'express';
import myRouter from './api/router.js';
import cors from 'cors';

const PORT = 3005;
const HOST = 'localhost';
const app = express();

app.use(json());
app.use(cors());

app.use('/', myRouter);

app.listen(PORT, HOST, (req, res) => {
    console.log(`Server ${HOST} nasłuchuje na Porcie: ${PORT}`)
})
