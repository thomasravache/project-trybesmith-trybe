import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import { Product, ProductAllProps } from '../types';

const getAll = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT
      *
    FROM
      Trybesmith.Products;
  `;

  const [products] = await connection.execute<RowDataPacket[]>(query);

  return products;
};

const create = async ({ name, amount }: Product): Promise<ProductAllProps> => {
  const query = `
    INSERT INTO
      Trybesmith.Products (name, amount)
    VALUES
      (?, ?);
  `;

  const [createdProductRow] = await connection.execute<ResultSetHeader>(query, [name, amount]);

  const createdProduct: ProductAllProps = {
    id: createdProductRow.insertId,
    name,
    amount,
  };

  return createdProduct;
};

const ProductModel = {
  create,
  getAll,
};

export default ProductModel;
