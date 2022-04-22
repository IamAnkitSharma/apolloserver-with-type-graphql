import jwt from 'jsonwebtoken';
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";
import { JwtPayLoad } from '../services/jwt-payload.interface';


interface Headers {
    authorization: string;
}

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = (context.req.headers as unknown as Headers).authorization;
    if (!authorization) {
        throw new Error('Auth Token required');
    }
    const token = authorization.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayLoad;
        context.user = {
            ...context.user,
            id: payload.userId
        }
    }
    catch (err) {
        console.log(err)
        throw new Error('Invalid Token');
    }
    return next();
}