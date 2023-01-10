import { UserMutaionresponse } from "../types/UserMutationResponse";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { RegisterInput } from "../types/RegisterInput";
import { User } from "../entities/User";
import { LoginInput } from "../types/LoginInput";
import { createToken } from "../utils/auth";

@Resolver()
export class UserResolver {
    @Query((_type) => String)
    hello() {
        return "hello";
    }

    @Mutation((_return) => UserMutaionresponse)
    async register(
        @Arg("registerInput") registerInput: RegisterInput
    ): Promise<UserMutaionresponse> {
        try {
            const { username, email, password } = registerInput;

            const existingUser = await User.findOne({
                where: [{ username }, { email }],
            });
            if (existingUser) {
                return {
                    code: 400,
                    success: false,
                    message: "Duplicated username or email",
                    errors: [
                        {
                            field:
                                existingUser.username === username
                                    ? "username"
                                    : "email",
                            message: `${
                                existingUser.username === username
                                    ? "Username"
                                    : "Email"
                            } already taken`,
                        },
                    ],
                };
            }

            const hashedPassword = await argon2.hash(password);

            const newUser = User.create({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            return {
                code: 200,
                success: true,
                message: "Register successful",
                user: newUser,
            };
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error}`,
            };
        }
    }

    @Mutation((_return) => UserMutaionresponse)
    async login(
        @Arg("loginInput") loginInput: LoginInput
    ): Promise<UserMutaionresponse> {
        try {
            const { accout, password } = loginInput;

            const checkAccout = accout.includes("@")
                ? { email: accout }
                : { username: accout };
            const existingUser = await User.findOne({ where: checkAccout });
            if (!existingUser) {
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                    errors: [
                        {
                            field: "accout",
                            message: "Username or email incorrect",
                        },
                    ],
                };
            }

            const passwordValid = await argon2.verify(
                existingUser.password,
                password
            );
            if (!passwordValid) {
                return {
                    code: 400,
                    success: false,
                    message: "Incorrect account or password",
                    errors: [
                        {
                            field: "accout",
                            message: "Username or email incorrect",
                        },
                    ],
                };
            }

            return {
                code: 200,
                success: true,
                message: "Register successful",
                user: existingUser,
                accessToken: createToken(existingUser)
            };
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error}`,
            };
        }
    }

    // @Mutation((_return) => Boolean)
    // logout(@Ctx() { req, res }: Context): Promise<boolean> {
    //     return new Promise((resolve, _reject) => {
    //         res.clearCookie(COOKIE_NAME);

    //         req.session.destroy((error) => {
    //             if (error) {
    //                 console.log("DESTROYING SESSION ERROR", error);
    //                 resolve(false);
    //             }
    //             else {
    //                 resolve(true);
    //             }
    //         });
    //     });
    // }
}
