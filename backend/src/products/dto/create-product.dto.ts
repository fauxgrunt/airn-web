import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'Price cannot be negative.' })
  price: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0, { message: 'Stock must be non-negative.' })
  stock: number;

  @IsOptional()
  @IsString()
  batchNumber?: string;
}