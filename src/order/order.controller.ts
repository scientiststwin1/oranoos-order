import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ChangeLevelDto, RegisterOrderDto } from './model/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ){}

    @Post('/register')
    submitOrder(@Body() registerOrderDto: RegisterOrderDto){
        return this.orderService.registerOrder("5e340a3f-b026-4edf-82d1-015f308f79bd",registerOrderDto)
    }

    @Get('/orders')
    listOrder(@Query('count') count: number, @Query('page') page: number){
        return this.orderService.listOrder(page, count)
    }

    @Put('/change-order-level')
    changeLevel(@Body() changeLevelDto:ChangeLevelDto){
        return this.orderService.changeLevel(changeLevelDto)
    }
}
