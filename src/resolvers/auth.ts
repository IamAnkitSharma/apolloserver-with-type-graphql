import { IUser, User } from './../models/user.model';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { LoginResponse, UserObjectType } from '../typeDefs/auth';
import "reflect-metadata";
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { MyContext } from '../types';

@Resolver()
export class AuthResolver {
    @Query(() => UserObjectType)
    @UseMiddleware(isAuthenticated)
    async profile(
        @Ctx() ctx: MyContext
    ): Promise<IUser> {
        const user = await UserService.getUserById(ctx.user.id);
        if (!user) throw new Error('User not found');
        return user;
    }

    @Query(() => LoginResponse)
    async login(
        @Arg('username', () => String) username: string,
        @Arg('password', () => String) password: string
    ): Promise<LoginResponse> {
        const user = await UserService.login(username, password);
        if (!user) throw new Error('Invalid username or password');
        return {
            accessToken: jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        }
    }

    @Mutation(() => UserObjectType)
    async signup(
        @Arg('username', () => String) username: string,
        @Arg('password', () => String) password: string
    ): Promise<IUser> {
        const user = await UserService.createUser(username, password);
        return user;
    }
}