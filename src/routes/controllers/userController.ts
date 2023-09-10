import express, { Request, Response } from 'express';
import Users, { IUser } from '../../models/users';

// Register routes
const userControllers = {
    registerUser: async (req: Request, res: Response) => {
        try {
            const { user_id, username, passwd, email, addressOfWallet, balance } = req.body;
            const existingUser: IUser | null = await Users.findOne({ user_id });
            if (existingUser) {
                return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
            }
            const newUser: IUser | null = new Users({
                user_id,
                username,
                passwd,
                email,
                addressOfWallet,
                balance: 0,
            });
            await newUser.save();
            res.status(200).json({ message: 'Đăng kí thành công' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'lỗi từ server' });
        }
    },
};
export default userControllers;
