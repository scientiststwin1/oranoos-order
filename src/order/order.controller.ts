import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterOrderDto } from './model/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ){}

    @Post('/register')
    submitOrder(@Body() registerOrderDto: RegisterOrderDto){
        this.orderService.registerOrder("5e340a3f-b026-4edf-82d1-015f308f79bd",registerOrderDto)
    }
}
