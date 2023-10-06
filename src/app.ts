import connectWithDatabase from './config/connectDTB';
// src/app.ts
import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user';

const app = express();
const port = 3000;
const mongoose = require('mongoose');

require('dotenv').config();
connectWithDatabase();
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use(morgan('common'));
app.get('/v1/', userRoutes);

app.listen(port, () => {
    console.log(`API is listening at http://localhost:${port}`);
});
