import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-posts.dto';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from './post.entity';
import * as fsExtra from 'fs-extra';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postRepository: PostsRepository,
  ) {}

  async addPosts(
    createPostsDto: CreatePostDto,
    user: UserEntity,
    image: Express.Multer.File,
  ): Promise<PostEntity> {
    return this.postRepository.addPosts(createPostsDto, user, image);
  }

  getPosts(user: UserEntity): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number, user: UserEntity): Promise<PostEntity> {
    const found = await this.postRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Post ${id} is not found!`);
    }
    return found;
  }

  async updatePostById(
    id: number,
    description: string,
    user: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.getPostById(id, user);
    post.description = description;
    await post.save();
    return post;
  }

  async deletePostById(id: number, user: UserEntity): Promise<PostEntity> {
    const found = await this.getPostById(id, user);
    const image = found;
    await fsExtra.remove(`upload/${image}`);
    const result = await this.postRepository.delete({ id, userId: user.id }); //userId=post user.id= signin
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id: ${id} is not found`);
    } else {
      return found;
    }
  }
}
