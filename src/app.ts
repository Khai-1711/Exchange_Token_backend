import connectWithDatabase from './config/connectDTB';
// src/app.ts
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
import userRoutes from './routes/user';

require('dotenv').config();
connectWithDatabase();
mongoose.connection.on('error', (err) => {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
});

// Xử lý sự kiện khi mất kết nối
mongoose.connection.on('disconnected', () => {
    console.log('Mất kết nối đến cơ sở dữ liệu');
});

const swaggerSpecs = require('./config/swagger'); // Đường dẫn đến tệp cấu hình Swagger
app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/v1/', userRoutes);

app.listen(port, () => {
    console.log(`API is listening at http://localhost:${port}`);
});
