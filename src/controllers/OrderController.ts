import { Router, Response, Request, NextFunction } from 'express';
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

orderRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.findAll();

    return res.status(StatusCodes.OK).json(orders);
  } catch (e) {
    next(e);
  }
});

orderRoutes.get('/:orderId', async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const order = await OrderService.findById(parseInt(orderId, 10));

    return res.status(StatusCodes.OK).json(order);
  } catch (e) {
    return next(e);
  }
});

export default orderRoutes;
