/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';

import { CreateProductSchema, DeleteProductSchema, GetProductByIdSchema, GetProductsSchema, UpdateProductSchema } from './schemas';
import { validateSchema } from '../../validations/schemas';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../../controllers/products.controller';
import { authenticate } from '../../middlewares/authenticate.middleware';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/',
    {
      schema: validateSchema(CreateProductSchema),
      preValidation: authenticate({ role: ['admin'] }),
    },
    createProduct,
  );
  fastify.get('/:id', validateSchema(GetProductByIdSchema), getProductById);
  fastify.get('/', validateSchema(GetProductsSchema), getProducts);
  fastify.patch(
    '/:id',
    {
      schema: validateSchema(UpdateProductSchema),
      preValidation: authenticate({ role: ['admin'] }),
    },
    updateProduct,
  );
  fastify.delete('/:id', validateSchema(DeleteProductSchema), deleteProduct);

}
