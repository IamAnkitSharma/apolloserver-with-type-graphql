import { IUser, User } from './../models/user.model';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { LoginResponse, UserObjectType } from '../typeDefs/auth';
import "reflect-metadata";
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { MyContext } from '../types';
import { LoginInput } from './dto/login.dto';
import { SignupInput } from './dto/signup.dto';

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
        @Arg('data', () => LoginInput) login: LoginInput,
    ): Promise<LoginResponse> {
        const user = await UserService.verifyUserNameAndPassword(login.username, login.password);
        return {
            accessToken: jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        }
    }

    @Mutation(() => UserObjectType)
    async signup(
        @Arg('data', () => SignupInput) data: SignupInput,
    ): Promise<IUser> {
        const user = await UserService.createUser(data.username, data.password);
        return user;
    }
}