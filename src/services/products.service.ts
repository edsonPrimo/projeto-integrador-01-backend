import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getRepository } from '../db';
import { InternalError } from '../utils/error';
import { ProductDto } from '../controllers/products.controller/dtos/products.dto';
import Product from '../db/models/product';

class ProductsService {
  private getRepository() {
    return getRepository(Product);
  }

  async insertDb(input: QueryDeepPartialEntity<Product>): Promise<Product> {
    try {
      const res = await this.getRepository().insert(input);
      return {
        ...res.generatedMaps[0],
        ...input,
      } as Product;
    } catch (e) {
      console.error(e);
      throw InternalError('Internal error, try again later');
    }
  }

  async createProduct(input: ProductDto) {
    return this.insertDb(input);
  }

  async getProductById(id: string): Promise<Product> {
    return (await this.getRepository().findOneBy({ id })) as Product;
  }

  async getProducts(offset: number, limit: number): Promise<Product[]> {
    if (limit > 100) limit = 100;
    if (offset && !limit) limit = 100;
    const products = await this.getRepository().find({
      skip: offset || 0,
      take: limit,
    });

    return products as Product[];
  }

  async updateProduct(id: string, input: ProductDto): Promise<{ id: string }> {
    const result = await this.getRepository().update(id, input);
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id };
  }

  async deleteProduct(id: string): Promise<{ id: string }> {
    const result = await this.getRepository().delete({ id });
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id };
  }
}

export default new ProductsService();
