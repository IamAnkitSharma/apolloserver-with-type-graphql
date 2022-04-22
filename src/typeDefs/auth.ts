import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class UserObjectType {
    @Field()
    id!: string;

    @Field()
    name!: string;
}