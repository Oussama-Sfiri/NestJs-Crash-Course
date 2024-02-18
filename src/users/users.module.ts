import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { UsersController } from './controllers/users/users.controller'
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { Example2Middleware } from './middlewares/example2/example2.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ExampleMiddleware).forRoutes(
        {
          path : "/users",
          method : RequestMethod.GET
        },
        {
          path : "/users/posts",
          method : RequestMethod.GET
        },
        {
          path : "/users/findByAge/:age",
          method : RequestMethod.GET
        }
      ).apply(Example2Middleware).forRoutes(
        {
          path : "/users",
          method : RequestMethod.GET
        },
        {
          path : "/users/posts",
          method : RequestMethod.GET
        },
        {
          path : "/users/findByAge/:age",
          method : RequestMethod.GET
        },
        {
          path : "/users",
          method : RequestMethod.POST
        },
        {
          path : "/users/:id",
          method : RequestMethod.GET
        }
      )
  }
}
