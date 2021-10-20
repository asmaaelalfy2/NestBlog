import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPostDto } from 'src/dtos/create-post.dto';
import { createUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private UserRepo: UserRepository, private jwtservice: JwtService
    ) { }

    async createUser(CreateUserDto: createUserDto): Promise<User> {
        const { username, password } = CreateUserDto;

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const user = this.UserRepo.create({
            username, password: hash
        })


        try {
            return await this.UserRepo.save(user)

        } catch (error) {
            if (error.code == '23505') {
                throw new ConflictException("user already exists")
            } else {
                throw new InternalServerErrorException()
            }
        }

    }

    async signIn(CreateUserDto: createUserDto): Promise<any> {
        const { username, password } = CreateUserDto;
        const user = await this.UserRepo.findOne({ username })

        if (user && (await bcrypt.compare(password, user.password))) {

            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtservice.sign(payload);

            return { accessToken }
            // return user;
        } else {
            throw new UnauthorizedException("username or password  not correct")
        }
    }
}
