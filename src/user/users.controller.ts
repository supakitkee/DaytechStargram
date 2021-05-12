import { Controller, Post, Body, Get, UseGuards, Req, Param } from '@nestjs/common';
import { UserCredentailDto } from './dto/user-credential.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';
import { UserEntity } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  singUp(@Body() userCredentialDto: UserCredentailDto) {
    return this.usersService.signUp(userCredentialDto);
  }

  @Post('/signin')
  singIn(@Body() userCredentail: UserCredentailDto) {
    return this.usersService.signIn(userCredentail);
  }

  @Get()
  getUsers(@GetUsername() user: UserEntity) {
    return this.usersService.getUsers(user);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('/:id/posts')
  getPostsByUserId(@Param('id') id: number) {
    return this.usersService.getPostsByUserId(id);
  }

  // @Get('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req, @GetUsername() username) {
  //   return username
  // }

}
