import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { extname } from 'path';
import * as fsExtra from 'fs-extra';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserEntity } from '../user/user.entity';
import { GetUsername } from '../user/get-username.decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  addPosts(
    @UploadedFile() image,
    @Body() createPostsDto: CreatePostDto,
    @GetUsername() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postsService.addPosts(createPostsDto, user, image);
  }

  @Get()
  getPosts(@GetUsername() user: UserEntity) {
    return this.postsService.getPosts(user);
  }

  @Get('/:id')
  getPostsById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.getPostById(id, user);
  }

  @Patch('/:id/description')
  async updatePostById(
    @Param('id') id: number,
    @Body('description') description: string,
    @GetUsername() user: UserEntity,
  ) {
    return await this.postsService.updatePostById(id, description, user);
  }

  @Delete('/:id')
  deletePostById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.deletePostById(id, user);
  }
}
