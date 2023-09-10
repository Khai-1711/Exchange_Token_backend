const express = require('express');
import UserControllers from './controllers/userController';

const router = express.Router();

router.post('/v1/register', UserControllers.registerUser);

export default router;
