import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('orders-create', createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderClient.send('orders-findAll', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderClient.send('orders-findOne', id);
  }
}
