import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() createUserDto: createUserDto): Promise<User> {
        return await this.authService.createUser(createUserDto)
    }

    @Post('/signin')
    async signIn(@Body() createUserDto: createUserDto): Promise<User> {
        return await this.authService.signIn(createUserDto)
    }

}
