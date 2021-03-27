import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class Property{
    @ApiProperty()
    @IsString()
    product_id: string

    @ApiProperty()
    @IsNumber()
    number: string
}

export class RegisterOrderDto {

    @ApiProperty({type: [Property]})
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested({each:true})
    @Type(() => Property)
    order_product: Property[]
}

