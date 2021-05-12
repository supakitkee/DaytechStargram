import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { GetUsername } from '../user/get-username.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentsRepository extends Repository<CommentEntity> {
  async addComments(
    createCommentsDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { description,postId } = createCommentsDto;
    const comment = new CommentEntity();
    comment.description = description;
    comment.user = user;
    comment.postId = postId;
    await comment.save();

    delete comment.user;
    return comment;
  }
}
