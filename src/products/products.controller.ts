import { Body, Controller, Get, Param, Post, Put, Req, Request as Re, Res, Response as Resp, UseGuards, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import {Request, Response} from 'express'
import { Product } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller("products")
export class ProductsController {

    

    constructor(
        private readonly productsService: ProductsService,
        // private jwtService: JwtService
    ){}

    @UseGuards(AuthGuard)
    @Get()
    async getAllProductsController(@Re() request: Request, @Resp() response:Response){
        // console.log('request: ', request)
        const data = await this.productsService.getAllProductsService()
        return response.status(200).json(data);
        // return this.productsService.getAllProductsService();
    }
    @UseGuards(AuthGuard)
    @Get(":id")
    async getProductController(@Param('id') id: string, @Req() request: Request, @Res() response:Response){
       
            const dataResponse = await this.productsService.getProductByIdService(parseInt(id));
            return response.status(200).json(dataResponse);
    
    }
    @UseGuards(AuthGuard)
    @Post()
    async createProductController(@Body() data: Product, @Re() request: Request, @Res() response:Response){
        const dataResponse = await this.productsService.createProductService(data)
        return response.status(201).json(dataResponse);
    }
    @UseGuards(AuthGuard)
    @Put(":idU")
    async updateProductController(@Param('idU') id: string, @Body() data: Product,@Req() request: Request, @Res() response:Response){
        // console.log(request)
        const dataResponse = await this.productsService.updateProductService(data, parseInt(id))
        return response.status(200).json(dataResponse);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteProductController(@Param('id') id: string,@Req() request: Request, @Res() response:Response){
        const dataResponse = await this.productsService.deleteProductService(parseInt(id))
        return response.status(200).json(dataResponse);
    }
}
