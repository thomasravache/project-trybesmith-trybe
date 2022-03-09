import ProductModel from '../models/ProductModel';
import { Product, ProductAllProps } from '../types';

const create = async (productInfo: Product): Promise<ProductAllProps> => {
  const createdProduct = await ProductModel.create(productInfo);

  return createdProduct;
};

const ProductService = {
  create,
};

export default ProductService;
