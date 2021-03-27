import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/shared/auth/admin-control.guard';
import { JwtAuthGuard } from 'src/shared/auth/jwt.guard';
import { RegisterOrderDto } from './model/order.dto';
import { OrderService } from './order.service';
import { UserRole } from "../shared/user.enum";

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
