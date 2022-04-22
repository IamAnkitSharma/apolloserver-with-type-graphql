import jwt from 'jsonwebtoken';
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";
import { JwtPayLoad } from '../services/jwt-payload.interface';


interface Headers {
    authorization: string;
}

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
    const autorization = (context.req.headers as unknown as Headers).authorization;
    if (!autorization) {
        throw new Error('Auth Token required');
    }
    const token = autorization.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayLoad;
        context.user = {
            ...context.user,
            id: payload.userId
        }
    }
    catch (err) {
        throw new Error('Invalid Token');
    }
     
    return next();
}