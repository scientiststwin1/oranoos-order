import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, isString, IsString, Max, Min, ValidateNested } from "class-validator";

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

export class ChangeLevelDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    order_id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(3)
    new_level: number

}