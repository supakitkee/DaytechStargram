import { Repository, EntityRepository } from 'typeorm';
import { CreatePostDto } from './dto/create-posts.dto';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';
import { UploadedFile, Body } from '@nestjs/common';
import { GetUsername } from '../user/get-username.decorator';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { Express } from 'express';

@EntityRepository(PostEntity)
export class PostsRepository extends Repository<PostEntity> {
  async addPosts(
    createPostsDto: CreatePostDto,
    user: UserEntity,
    image: Express.Multer.File,
  ): Promise<PostEntity> {
    const { description } = createPostsDto;
    const post = new PostEntity();
    post.description = description;
    post.user = user;
    await post.save();

    if (image) {
      const imageFile = post.id + extname(image.originalname); //..
      fsExtra.move(image.path, `upload/${imageFile}`);
      post.image = imageFile;
      await post.save();
    }

    delete post.user;
    return post;
  }
}
