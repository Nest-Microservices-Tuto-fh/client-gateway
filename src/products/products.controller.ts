import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = firstValueFrom(
        this.productClient.send({ cmd: 'products-create' }, createProductDto),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'products-findAll' }, paginationDto);
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'products-findOne' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'products-update' }, { id, ...body }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'products-remove' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
