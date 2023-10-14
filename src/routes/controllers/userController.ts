import express, { Request, Response } from 'express';
import Users, { IUser } from '../../models/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register routes
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, passwd, email, addressOfWallet, balance } = req.body;
        const hashedPassword = await bcrypt.hash(passwd, 10);
        const existingUser: IUser | null = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
        }
        const newUser: IUser | null = new Users({
            username,
            passwd: hashedPassword,
            email,
            addressOfWallet,
            balance: balance || 0, // Sửa thứ tự để kiểm tra balance trước
        });

        await newUser.save();
        res.status(200).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi từ server' });
    }
};

// get all user
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await Users.find();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// find user by name
export const findUserByName = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
    const { username, passwd } = req.body;
    try {
        const user = await Users.findOne({ username });
        if (user) {
            const isPasswordValid: string = await bcrypt.compare(passwd, user.passwd);

            if (isPasswordValid) {
                const ac = jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                    },
                    process.env.MY_SEC_KEY,
                    { expiresIn: '30s' },
                );
                const a = { ...user.toObject() };
                delete a.passwd;
                return res.status(200).json({ user: a, ac });
            }
        }
        return res.status(400).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};