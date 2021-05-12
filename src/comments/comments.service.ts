import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { UserEntity } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentRepository: CommentsRepository,
  ) {}

  async addComments(
    createCommentsDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentRepository.addComments(createCommentsDto, user);
  }

  getComments(user: UserEntity): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  async getCommentsById(id: number, user: UserEntity): Promise<CommentEntity> {
    const found = await this.commentRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Comment ${id} is not found!`);
    }
    return found;
  }

  async updateCommentById(
    id: number,
    description: string,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const comment = await this.getCommentsById(id, user);
    comment.description = description;
    await comment.save();
    return comment;
  }

  async deleteCommentById(
    id: number,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const found = await this.getCommentsById(id, user);
    const result = await this.commentRepository.delete({ id, userId: user.id }); //userId=post user.id= signin
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id: ${id} is not found`);
    } else {
      return found;
    }
  }
}
