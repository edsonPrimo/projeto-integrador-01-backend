import { FastifyRequest } from 'fastify';
import productsService from '../../services/products.service';
import { CreateProductDto } from './dtos/products.dto';
import Product from '../../db/models/products';

export async function createProduct(req: FastifyRequest): Promise<Product> {
  return productsService.createProduct(req.body as CreateProductDto);
}

export async function getProductById(req: FastifyRequest): Promise<Product> {
  const id = req.params as string;
  return productsService.getProductById(id);
}

export async function getProducts(req: FastifyRequest): Promise<Product[]> {
  const { offset, limit } = req.query as { offset: number; limit: number };
  return productsService.getProducts(offset, limit);
}
