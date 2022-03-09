import { ResultSetHeader } from 'mysql2';
import { Order, OrderFullProps } from '../types';
import connection from './connection';

const create = async ({ userId, products }: Order): Promise<OrderFullProps> => {
  const queryOrder = `
    INSERT INTO Trybesmith.Orders (userId) VALUES (?);
  `;
  const queryProduct = `
    UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;
  `;

  const [createdOrderRow] = await connection.execute<ResultSetHeader>(queryOrder, [userId]);

  products.forEach(async (productId) => {
    await connection.execute(queryProduct, [createdOrderRow.insertId, productId]);
  });

  const createdOrder: OrderFullProps = {
    id: createdOrderRow.insertId,
    userId,
    products,
  };

  return createdOrder;
};

const OrderModel = {
  create,
};

export default OrderModel;
