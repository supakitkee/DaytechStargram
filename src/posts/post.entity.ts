import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity({name:'post'}) //Optional set naming
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: "noimage.jpeg"})
  image: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => UserEntity, user => user.posts, {eager: false})
  user: UserEntity

  @Column()
  userId: number
  
  @OneToMany(type => CommentEntity, comment => comment.user, {eager: true})
  comments: CommentEntity

}

