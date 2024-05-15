import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

    constructor(private prisma:PrismaService){}

    async getAllProductsService(): Promise<Product[]>  {
        return this.prisma.product.findMany()
    }
    async getProductByIdService(id: number): Promise<Product>{
        return this.prisma.product.findUnique({
            where: {
                id
            }
        })
    }
    async getProductByHandleService(handle:string): Promise<Product>{
        return this.prisma.product.findFirst({
            where: {
                handle:handle
            }
        })
    }
    async createProductService(data:Product): Promise<Product>{
        return this.prisma.product.create({
            data
        })
    }
    async updateProductService(data:Product, id:number): Promise<Product>{
        return this.prisma.product.update({
            where: {
                id
            },
            data
        })
    }
    async deleteProductService(id:number): Promise<Product>{   
        return this.prisma.product.delete({
            where: {
                id
            }
        })
    }
}
