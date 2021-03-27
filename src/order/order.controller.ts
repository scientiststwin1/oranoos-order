import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ChangeLevelDto, RegisterOrderDto } from './model/order.dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../shared/auth/jwt.guard'
import { AdminGuard } from '../shared/auth/admin-control.guard'
import { User } from '../shared/auth/user.decorator'
@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ){}

    @Post('/')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    submitOrder(@Body() registerOrderDto: RegisterOrderDto, @User() user: any){
        return this.orderService.registerOrder(user.id,registerOrderDto)
    }

    @Get('/')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    listOrder(@Query('count') count: number, @Query('page') page: number){
        return this.orderService.listOrder(page, count)
    }

    @Put('/change-order-level')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    changeLevel(@Body() changeLevelDto:ChangeLevelDto){
        return this.orderService.changeLevel(changeLevelDto)
    }
}
