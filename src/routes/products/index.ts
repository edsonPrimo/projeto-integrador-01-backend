/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';

import {
  CreateProductSchema,
  GetProductByIdSchema,
  GetProductsSchema,
} from './schemas';
import { validateSchema } from '../../validations/schemas';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../../controllers/products.controller';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post('/', validateSchema(CreateProductSchema), createProduct);
  fastify.get('/:id', validateSchema(GetProductByIdSchema), getProductById);
  fastify.get('/', validateSchema(GetProductsSchema), getProducts);
}
