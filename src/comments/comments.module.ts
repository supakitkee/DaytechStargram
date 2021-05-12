import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/user/users.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';


@Module({
    imports: [
         TypeOrmModule.forFeature([CommentsRepository]), UsersModule],
      controllers: [CommentsController],
      providers: [CommentsService]
})

export class CommentsModule {}
