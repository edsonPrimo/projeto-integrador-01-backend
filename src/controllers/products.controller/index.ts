import { FastifyRequest } from 'fastify';
import productsService from '../../services/products.service';
import { ProductDto } from './dtos/products.dto';
import Product from '../../db/models/products';

export async function createProduct(req: FastifyRequest): Promise<Product> {
  return productsService.createProduct(req.body as ProductDto);
}

export async function getProductById(req: FastifyRequest): Promise<Product> {
  const { id } = req.params as { id: string };
  return productsService.getProductById(id);
}

export async function getProducts(req: FastifyRequest): Promise<Product[]> {
  const { offset, limit } = req.query as { offset: number; limit: number };
  return productsService.getProducts(offset, limit);
}

export async function updateProduct(
  req: FastifyRequest,
): Promise<{ id: string }> {
  const { id } = req.params as { id: string };
  return productsService.updateProduct(id, req.body as ProductDto);
}
