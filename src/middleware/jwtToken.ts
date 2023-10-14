import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';

export const accessVerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers as unknown as { [key: string]: string }).token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.MY_SEC_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token ko hợp lệ');
            }
            next();     
        });
    } else {
        return res.status(401).json('Token không tồn tại');
    }
};
