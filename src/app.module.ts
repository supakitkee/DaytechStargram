import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeOrmConfig), CommentsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
