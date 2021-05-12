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

import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/user.entity';
import { GetUsername } from '../user/get-username.decorator';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  addComments(
    @Body() createCommentsDto: CreateCommentDto,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.addComments(createCommentsDto, user);
  }

  @Get()
  getComments(@GetUsername() user: UserEntity) {
    return this.commentsService.getComments(user);
  }

  @Get('/:id')
  getCommentsById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.commentsService.getCommentsById(id, user);
  }

  @Patch('/:id/description')
  async updateCommentById(
    @Param('id') id: number,
    @Body('description') description: string,
    @GetUsername() user: UserEntity,
  ) {
    return await this.commentsService.updateCommentById(id, description, user);
  }

  @Delete('/:id')
  deleteCommentById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.commentsService.deleteCommentById(id, user);
  }

}
