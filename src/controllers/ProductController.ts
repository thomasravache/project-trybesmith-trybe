import { Router, Request, Response, NextFunction } from 'express';
import { validateSchema } from './schemas';
import productSchema from './schemas/productSchema';
import { Product, ProductAllProps, StatusCodes } from '../types';
import ProductService from '../service/ProductService';

const productRoutes = Router();

productRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const productInfo: Product = req.body;

  try {
    validateSchema<Product>(productSchema, productInfo);

    const newProduct: ProductAllProps = await ProductService.create(productInfo);

    return res.status(StatusCodes.CREATED).json({ item: newProduct });
  } catch (e) {
    return next(e);
  }
});

export default productRoutes;
