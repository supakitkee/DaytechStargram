import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostEntity } from '../posts/post.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity({name:'user'})
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => PostEntity, post => post.user, {eager: true})
  posts: PostEntity

  @OneToMany(type => CommentEntity, comment => comment.user, {eager: true})
  comments: CommentEntity

  @Column()
  salt: string;

  async verifyPassword(password){
    const hashPassword = await bcrypt.hash(password, this.salt)
    // console.log(this.password === hashPassword)
    return this.password === hashPassword
  }

}
