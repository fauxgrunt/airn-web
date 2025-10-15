import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards, 
  UsePipes, 
  ValidationPipe,
  Req 
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'; 
import { RolesGuard } from '../auth/roles.guard.js'; // <-- NEW IMPORT
import { Roles } from '../auth/roles.decorator.js';  // <-- NEW IMPORT
import { Product, Role } from '@prisma/client';

// Extend the Request interface for type safety
interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: Role; 
  };
}

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
// Apply the general AuthGuard and the RolesGuard globally
@UseGuards(JwtAuthGuard, RolesGuard) 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /products - ONLY ADMINS can create products
  @Post()
  @Roles(Role.ADMIN) // <-- RBAC DECORATOR
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthenticatedRequest, 
  ): Promise<Product> {
    const createdById = req.user.userId;
    return this.productsService.create(createProductDto, createdById);
  }

  // GET /products - ADMINS and USERS can view all products
  @Get()
  @Roles(Role.ADMIN, Role.USER) // <-- RBAC DECORATOR
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // GET /products/:id - ADMINS and USERS can view a single product
  @Get(':id')
  @Roles(Role.ADMIN, Role.USER) // <-- RBAC DECORATOR
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  // PUT /products/:id - ONLY ADMINS can update products
  @Put(':id')
  @Roles(Role.ADMIN) // <-- RBAC DECORATOR
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  // DELETE /products/:id - ONLY ADMINS can delete products
  @Delete(':id')
  @Roles(Role.ADMIN) // <-- RBAC DECORATOR
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(+id);
  }
}