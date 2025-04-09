import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TodoModule } from './todo/todo.module';
import { error } from 'console';

@Module({

  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ],
      //simplificar el error (opcional)
      // formatError: (error) => {
      //   const originalError = error.extensions?.originalError as any;

      //   if(!originalError) {
      //     return {
      //       message: error.message,
      //       code: error.extensions?.code,
      //     };
      //   }
      //   return {
      //     message: originalError.message,
      //     code: error.extensions?.code
      //   };
      // }        
    }),
    HelloWorldModule,
    TodoModule
  ],
  controllers: [],
  providers: [],

})export class AppModule {}
