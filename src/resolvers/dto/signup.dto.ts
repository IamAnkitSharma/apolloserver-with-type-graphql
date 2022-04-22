import { MaxLength, Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  username!: string;

  @Field()
  password!: string;
}