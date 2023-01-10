import { PostMutationResponse } from "../types/PostMutationResponse";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { CreatePostInput } from "../types/CreatePostInput";
import { Post } from "../entities/Post";
import { UpdatePostInput } from "../types/UpdatePostInput";

@Resolver()
export class PostResolver {
    @Mutation((_return) => PostMutationResponse)
    async createPost(
        @Arg("createPostInput") createPostInput: CreatePostInput
    ): Promise<PostMutationResponse> {
        try {
            const { title, text } = createPostInput;

            const newPost = Post.create({
                title,
                text,
            });
            await newPost.save();

            return {
                code: 200,
                success: true,
                message: "Created post successful",
                post: newPost,
            };
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error}`,
            };
        }
    }

    @Query((_return) => [Post], { nullable: true })
    async posts(): Promise<Post[] | null> {
        return await Post.find({});
    }

    @Query((_return) => Post, { nullable: true })
    async post(@Arg("id", _type => ID) id: number): Promise<Post | null> {
        const post = await Post.findOne({ where: { id } });
        return post;
    }

    @Mutation((_return) => PostMutationResponse)
    async updatePost(
        @Arg("updatePostInput") updatePostInput: UpdatePostInput
    ): Promise<PostMutationResponse> {
        try {
            const { id, title, text } = updatePostInput;
            const existingPost = await Post.findOne({ where: { id } });
            if(!existingPost) {
                return {
                    code: 500,
                    success: false,
                    message: "Post not found"
                }
            }
            
            existingPost.title = title;
            existingPost.text = text;

            await existingPost.save()
            
            return {
                code: 200,
                success: true,
                message: "Updated post successful",
                post: existingPost
            }

        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error}`
            }
        }
    }

    @Mutation((_return) => PostMutationResponse)
    async deletePost(
        @Arg("id", _type => ID) id: number
    ): Promise<PostMutationResponse> {
        try {
            const existingPost = await Post.findOne({ where: { id } });
            if(!existingPost) {
                return {
                    code: 500,
                    success: false,
                    message: "Post not found"
                }
            }

            await Post.delete({id})
            
            return {
                code: 200,
                success: true,
                message: "Deleted post successful",
            }

        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error}`
            }
        }
    }




}
