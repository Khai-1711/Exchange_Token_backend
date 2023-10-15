import express, { Express } from 'express';
import { registerUser, getAllUser, findUserByName, login, requestRefreshToken } from './controllers/userController';
import { accessVerifyToken } from '../middleware/jwtToken';

const router = express();
// LOGIN
router.post('/login', login);
// REGISTER
router.post('/register', registerUser);
// GET ALL USER
router.get('/users', accessVerifyToken, getAllUser);
// FIND USER BY NAME
router.get('/users/:username', findUserByName);
// REFRESH TOKEN
router.post('/refreshToken', requestRefreshToken);

export default router;
