import generatedError from '../errors/errorGenerator';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import { Order, StatusCodes } from '../types';

const create = async ({ userId, products }: Order): Promise<Order> => {
  const allProducts = await ProductModel.getAll();

  const productNotFound = products
    .some((productId) => !allProducts.some(({ id }) => productId === id));

  if (productNotFound) {
    throw generatedError('There are inexistent Product(s)', StatusCodes.NOT_FOUND);
  }

  const createdOrder = await OrderModel.create({ userId, products });

  return {
    userId: createdOrder.userId,
    products: createdOrder.products,
  } as Order;
};

const OrderService = {
  create,
};

export default OrderService;
