import { ResultSetHeader, RowDataPacket } from 'mysql2';
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

const findById = async (orderId: number): Promise<OrderFullProps> => {
  const queryOrder = `
    SELECT *
    FROM Trybesmith.Orders
    WHERE id = ?;
  `;
  const queryProduct = `
    SELECT id
    FROM Trybesmith.Products
    WHERE orderId = ?
  `;

  const [order] = await connection.execute<RowDataPacket[]>(queryOrder, [orderId]);
  const [products] = await connection.execute<RowDataPacket[]>(queryProduct, [orderId]);

  const productIdsSerialized = products.map((productId) => productId.id);

  return {
    id: order[0].id,
    userId: order[0].userId,
    products: productIdsSerialized,
  } as OrderFullProps;
};

const findAll = async (): Promise<OrderFullProps[]> => {
  const queryOrder = 'SELECT * FROM Trybesmith.Orders';
  const queryProduct = 'SELECT * FROM Trybesmith.Products';

  const [orders] = await connection.execute<RowDataPacket[]>(queryOrder);
  const [products] = await connection.execute<RowDataPacket[]>(queryProduct);

  const serializedOrders = orders.map((order) => {
    const serializedProducts = products
      .filter((product) => product.orderId === order.id)
      .map((product) => product.id);

    return {
      id: order.id,
      userId: order.userId,
      products: serializedProducts.length === 0 ? null : serializedProducts,
    } as OrderFullProps;
  });

  return serializedOrders as OrderFullProps[];
};

const getJustOrders = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT
      *
    FROM
      Trybesmith.Orders;
  `;

  const [orders] = await connection.execute<RowDataPacket[]>(query);

  return orders;
};

const OrderModel = {
  create,
  findById,
  getJustOrders,
  findAll,
};

export default OrderModel;
