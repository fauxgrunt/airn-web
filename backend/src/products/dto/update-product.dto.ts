import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType makes all fields from CreateProductDto optional for updates
export class UpdateProductDto extends PartialType(CreateProductDto) {}