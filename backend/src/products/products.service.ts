import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new product and links it to the creating user.
   * @param data The validated product creation data.
   * @param createdById The ID of the user creating the product (from the JWT payload).
   * @returns The newly created Product object.
   */
  async create(data: CreateProductDto, createdById: number): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
        createdById: createdById,
      },
    });
  }

  /**
   * Finds all products in the database.
   * @returns An array of Product objects.
   */
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      // Include the creator's name in the response
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });
  }

  /**
   * Finds a single product by its ID.
   * @param id The product ID.
   * @returns The Product object.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  /**
   * Updates an existing product.
   * @param id The product ID.
   * @param data The validated update data.
   * @returns The updated Product object.
   */
  async update(id: number, data: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (e) {
      // Catch Prisma error if the ID is not found
      if (e.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      throw e;
    }
  }

  /**
   * Deletes a product by its ID.
   * @param id The product ID.
   * @returns The deleted Product object.
   */
  async remove(id: number): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (e) {
      // Catch Prisma error if the ID is not found
      if (e.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      throw e;
    }
  }
}