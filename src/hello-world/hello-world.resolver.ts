import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {description: 'Retorna Hola Mundo', name: 'hello'})
    helloWorld(): string {
        return "Hola mundo";
    }

    @Query(() => Float, { name: 'randomNumber', description: 'retorna numero ramdom'})
    getRamndomNumber(): number {
        return Math.random() * 100
    }

    // randomFromZeroTo
    @Query(() => Int, {name: 'randomFromZeroTo', description: 'From zero to argument TO (exclusive) and default value is 6'})
    getRandomFromZeroTo(
        @Args('to', { type: () => Int, nullable: true }) to: number = 6
    ): number {
        
        return Math.floor(Math.random() * to);
    }


}
