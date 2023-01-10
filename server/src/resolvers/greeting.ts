import { Context } from '../types/Context'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { checkAuth } from '../middleware/checkAuth'

@Resolver()
export class GreetingResolver {
	@Query(_return => String)
    @UseMiddleware(checkAuth)
	async hello(
        @Ctx() context: Context 
    ): Promise<string> {
        console.log("CONTEXT: ", context.user.userId)
		return `Hello`
	}
}
