import { Body, Controller, Post,  Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService ){}

    @Post("login")
    async login(@Body() data: User){
        const {username, password} = data
        // console.log(data)
        const a = await this.authService.login(username, password)
        // console.log(a)
        return this.authService.login(username, password)
    }
    @Post("register")
    async createUser(@Body() data: User){
        // console.log(data)
        return this.authService.registerUser(data)
    }
    validateToken(){

    }
}
