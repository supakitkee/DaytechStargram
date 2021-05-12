import { PostEntity } from 'src/posts/post.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({name:'comment'})
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @UpdateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => UserEntity, user => user.comments, {eager: false, onDelete: 'CASCADE'})
  user: UserEntity

  @Column()
  userId: number

  @Column()
  postId: number

  @ManyToOne(type => PostEntity, post => post.comments, {eager: false, onDelete: 'CASCADE'})
  post: PostEntity

}