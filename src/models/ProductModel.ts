import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Product, ProductAllProps } from '../types';

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
};

export default ProductModel;
