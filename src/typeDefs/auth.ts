import { Field, ObjectType } from "type-graphql";

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