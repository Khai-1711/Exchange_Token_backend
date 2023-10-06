import express, { Express } from 'express';
import { registerUser, getAllUser, findUserByName, login } from './controllers/userController';

const router = express();
// LOGIN
router.post('/login', login);
// REGISTER
router.post('/register', registerUser);
// GET ALL USER
router.get('/users', getAllUser);
// FIND USER BY NAME
router.get('/users/:username', findUserByName);

export default router;
