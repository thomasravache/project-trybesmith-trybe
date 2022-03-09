import { Router, Request, Response, NextFunction } from 'express';
import { validateSchema } from './schemas';
import productSchema from './schemas/productSchema';
import { ProductRequest, Product, StatusCodes } from '../types';
import ProductService from '../service/ProductService';

const productRoutes = Router();

productRoutes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getAll();

    return res.status(StatusCodes.OK).json(products);
  } catch (e) {
    return next(e);
  }
});

productRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const productInfo: ProductRequest = req.body;

  try {
    validateSchema<ProductRequest>(productSchema, productInfo);

    const newProduct: Product = await ProductService.create(productInfo);

    return res.status(StatusCodes.CREATED).json({ item: newProduct });
  } catch (e) {
    return next(e);
  }
});

export default productRoutes;
