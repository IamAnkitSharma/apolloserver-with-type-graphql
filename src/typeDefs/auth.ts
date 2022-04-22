import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class UserObjectType {
    @Field()
    id!: string;

    @Field()
    username!: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken!: string;
}