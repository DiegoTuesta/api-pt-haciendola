import {Module} from '@nestjs/common'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtService],
  imports:[PrismaModule, AuthModule]
})
export class ProductsModule{

}