import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/user/users.module';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
    imports: [
      MulterModule.register({
        dest: './upload',
      }),
       TypeOrmModule.forFeature([PostsRepository]), UsersModule],
    controllers: [PostsController],
    providers: [PostsService]
  })

  export class PostsModule{}
