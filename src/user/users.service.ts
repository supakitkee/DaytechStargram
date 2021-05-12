import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentailDto } from './dto/user-credential.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { combineLatest } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp(userCredentailDto: UserCredentailDto): Promise<UserEntity> {
    return this.userRepository.createUser(userCredentailDto);
  }

  async signIn(userCredentailDto: UserCredentailDto) {
    const username = await this.userRepository.verifyUserPassword(
      userCredentailDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async getUsers(user: UserEntity): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    users.map((u) => {
      delete u.posts;
      delete u.comments;
    });
    return users;
  }

  async getUserById(id: number): Promise<UserEntity> {
    const found = await this.userRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`User ${id} is not found!`);
    }

    delete found.posts;
    delete found.comments;

    return found;
  }

  async getPostsByUserId(id: number) {
    const found = await this.userRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`User ${id} is not found!`);
    }
    return found.posts;
  }
}
