import generatedError from '../errors/errorGenerator';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import { Order, OrderFullProps, StatusCodes } from '../types';

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

const findById = async (orderId: number): Promise<OrderFullProps> => {
  const orders = await OrderModel.getJustOrders();

  const findedOrder = orders.find((order) => order.id === orderId);

  if (!findedOrder) throw generatedError('Order not found', StatusCodes.NOT_FOUND);

  const order = await OrderModel.findById(orderId);

  return order;
};

const findAll = async (): Promise<OrderFullProps[]> => OrderModel.findAll();

const OrderService = {
  create,
  findById,
  findAll,
};

export default OrderService;
