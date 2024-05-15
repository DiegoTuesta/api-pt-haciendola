import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private prisma:PrismaService,
        private jwtService: JwtService
    ){}

    validateToken(){

    }

    async registerUser(data: User){
        const {password} = data;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        data = {...data, password:hash}
        return this.prisma.user.create({
            data
        })
    }

    async login(user:string, pass:string){
        const userExits = await this.prisma.user.findFirst({
            where:{
                username:user
            }
        })
        if (!userExits) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
        
        const checkPassword = await bcrypt.compare(pass,userExits.password)
        if(!checkPassword)throw new HttpException('PASSWORD_INCORRECT', HttpStatus.NOT_FOUND)
        
        
        const token = await this.jwtService.signAsync({
            id:userExits.id,
            name: userExits.name,
            email: userExits.username
        })
        const data = {
            success: 'Login correcto!',
            token
        }

        return data;
      
    }
}
