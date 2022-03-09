import { RowDataPacket } from 'mysql2';
import ProductModel from '../models/ProductModel';
import { Product, ProductRequest } from '../types';

const getAll = async ():Promise<RowDataPacket[]> => ProductModel.getAll();

const create = async (productInfo: ProductRequest): Promise<Product> => {
  const createdProduct = await ProductModel.create(productInfo);

  return createdProduct;
};

const ProductService = {
  create,
  getAll,
};

export default ProductService;
