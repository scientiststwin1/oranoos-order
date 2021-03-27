import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import ConfigSchema from './config/configs.schema'
import MongoConfig from './config/mongo.config'
import RabbitMQConfig from './config/rabbitmq.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      validationSchema: ConfigSchema,
      load: [MongoConfig, RabbitMQConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get<string>('mongo.host')}/${config.get<string>('mongo.name')}`,
      }), 
      inject: [ConfigService]
    }),
    OrderModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
