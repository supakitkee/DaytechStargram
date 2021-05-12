import { Repository, EntityRepository } from "typeorm";
import { UserEntity } from './user.entity';
import { UserCredentailDto } from './dto/user-credential.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity>{
    async createUser(userCredentailDto:UserCredentailDto){
        const {username, password} = userCredentailDto
        const salt = bcrypt.genSaltSync();
        const user = new UserEntity()
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        try {
            await user.save()
        }catch(error){
            // console.log(error)
            if (error.code === '23505'){
                throw new ConflictException("Error, because this username already exist!")
            } else {
                throw new InternalServerErrorException();
            }
        }
        
        return user;
    }

    async verifyUserPassword(userCredentailDto:UserCredentailDto){
        const {username, password} = userCredentailDto;
        const user = await this.findOne({username}) //username:username => {username} 
        // console.log(user,'user')
        if (user && await user.verifyPassword(password)){
            return user.username
        }else{
            return null
        }
    }

    async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt)
    }
}