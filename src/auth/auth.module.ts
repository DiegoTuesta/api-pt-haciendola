import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  imports:[
    PrismaModule,
    JwtModule.register({
      secret:process.env.SECRET_TOKEN,
      signOptions: {expiresIn: '600s'}
    })
  ],
  exports: [AuthService],
})
export class AuthModule {}
