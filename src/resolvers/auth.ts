import { IUser, User } from './../models/user.model';
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";

import { UserObjectType } from '../typeDefs/auth';
import "reflect-metadata";
import { UserService } from '../services/user.service';

@Resolver()
export class AuthResolver {
    @Query(() => UserObjectType)
    async getUserById(@Arg('id', () => String) id: string): Promise<IUser> {
        const user = await UserService.getUserById(id);
        if(!user) throw new Error('User not found');
        return user;
    }

    @Mutation(()=> UserObjectType)
    async createUser(@Arg('name', () => String) name: string): Promise<IUser> { 
        const user = await UserService.createUser(name);
        return user;
    }
}