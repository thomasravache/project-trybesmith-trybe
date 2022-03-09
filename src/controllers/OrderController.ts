import { Router, Response, NextFunction } from 'express';
import OrderService from '../service/OrderService';
import { CustomJwtPayload, CustomRequest, OrderRequest, StatusCodes } from '../types';
import { orderSchema, validateSchema } from './schemas';

const orderRoutes = Router();

orderRoutes.post('/', async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { userId } = req.tokenPayload as CustomJwtPayload;
  const { products }: OrderRequest = req.body;

  try {
    validateSchema<OrderRequest>(orderSchema, req.body);

    const createdOrder = await OrderService.create({ userId, products });

    return res.status(StatusCodes.CREATED).json({ order: createdOrder });
  } catch (e) {
    return next(e);
  }
});

export default orderRoutes;
