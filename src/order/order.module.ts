import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Order, OrderSchema} from './schema/order.schema'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/shared/auth/jwt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          name: 'PRODUCT',
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${config.get<string>('rabbitmq.host')}:${config.get<number>('rabbitmq.port')}`],
            queue: 'products',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),

    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])
  ],
  providers: [OrderService, JwtStrategy],
  controllers: [OrderController]
})
export class OrderModule {}
