import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) { }

  @Post()
  createProduct() {
    return 'Create a product'
  }

  @Get()
  findAllProducts() {
    return this.productClient.send({ cmd: 'products-findAll' }, {});
  }

  @Get(':id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return `Product ${id}`
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any) {
    return `Product ${id} updated`;
  }

  @Delete(':id')
  deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return `Product ${id} deleted`
  }
}
