import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterOrderDto } from './model/order.dto';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @Inject('PRODUCT') private client: ClientProxy,
    ){}

    registerOrder(userId: string, registerOrderDto: RegisterOrderDto){
        const { order_product } = registerOrderDto
        return new Promise(async (resolve, reject)=>{
            try{

                const orderItems = []
                for(let product of order_product){
                    const productInformation = await this.client.send('product-info',{id: product.product_id}).toPromise();
                    const order = {
                        number: product.number,
                        _id: productInformation.data._id,
                        name: productInformation.data.name,
                        price: productInformation.data.price,
                        description: productInformation.data.description 
                    }
                    orderItems.push(order)
                }

                const order = new this.orderModel()
                order.user = userId
                order.products = orderItems
                order.level = 0
    
                await order.save()
                resolve(1)
            }catch(err){
                reject()
            }
        })
    }

}


