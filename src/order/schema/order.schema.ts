import { Prop, SchemaFactory, Schema, raw } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { string } from "joi";

export type OrderDocument = Order & Document;
@Schema()
export class Order extends Document{
    
    @Prop({ type: String, required: true })
    user: string    
    
    @Prop([
        raw({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            number: { type: Number },
            name: { type: String },
            price: { type: String },
            description: { type: String },
        })
    ])
    products: Record<string, any>;

    @Prop({ required: true })
    level: number;

    @Prop({type: Date, default: Date.now })
    created_at: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order);
