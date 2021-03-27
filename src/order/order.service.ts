import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeLevelDto, RegisterOrderDto } from './model/order.dto';
import { Order, OrderDocument } from './schema/order.schema';
import {OrderLevel} from '../shared/order.enum'
import {timeout} from 'rxjs/operators'
import { ResultError } from 'src/shared/main.helper';
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
                    const productInformation = await this.client.send('product-info',{id: product.product_id}).pipe(timeout(1000)).toPromise();
                    const order = {
                        number: product.number,
                        _id: productInformation?.data._id,
                        name: productInformation?.data.name,
                        price: productInformation?.data.price,
                        description: productInformation?.data.description 
                    }
                    orderItems.push(order)
                }

                const order = new this.orderModel()
                order.user = userId
                order.products = orderItems
                order.level = OrderLevel.LEVEL1
    
                await order.save()
                resolve(1)
            }catch(err){
                reject(new ResultError(err, 500, 500, "Error occurred"))
            }
        })
    }

    listOrder(page: number, count: number){
        return new Promise(async(resolve, reject)=>{
            try{
                const products = await this.orderModel.find().sort({ created_at: 1 }).skip(+page * +count).limit(+count)
                console.log(products)
                resolve(products)
            }catch(err){
                reject(new ResultError(err, 500, 500, "Error occurred"))
            }

        })
    }

    changeLevel(changeLevelDto: ChangeLevelDto){
        const {order_id, new_level} = changeLevelDto
        return new Promise(async(resolve, reject)=>{
            try{
                const newOrder = await this.orderModel.updateOne({_id: order_id},{ $set: {level: new_level}}).exec()
                console.log("--->>>",newOrder)
                resolve(newOrder)
            }catch(err){
                reject(new ResultError(err, 500, 500, "Error occurred"))
            }
        })
    }

}


