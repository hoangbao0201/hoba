import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    accout: string

    @Field()
    password: string

}