import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User, UserFullProps } from '../types';

const getAll = async () => {
  const query = `
    SELECT
      *
    FROM
      Trybesmith.Users;
  `;

  const [users] = await connection.execute(query);

  return users;
};

const create = async ({ username, classe, level, password }: User): Promise<UserFullProps> => {
  const query = `
    INSERT INTO
      Trybesmith.Users (username, classe, level, password)
    VALUES
      (?, ?, ?, ?);
  `;

  const [createdRowUser] = await connection
    .execute<ResultSetHeader>(query, [username, classe, level, password]);

  const createdUser: UserFullProps = {
    id: createdRowUser.insertId,
    username,
    classe,
    level,
    password,
  };

  return createdUser;
};

const UserModel = {
  getAll,
  create,
};

export default UserModel;
