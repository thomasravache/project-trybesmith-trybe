import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import { User, UserRequest } from '../types';

const getAll = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT
      *
    FROM
      Trybesmith.Users;
  `;

  const [users] = await connection.execute<RowDataPacket[]>(query);

  return users;
};

const create = async (
  { username, classe, level, password }: UserRequest,
): Promise<User> => {
  const query = `
    INSERT INTO
      Trybesmith.Users (username, classe, level, password)
    VALUES
      (?, ?, ?, ?);
  `;

  const [createdRowUser] = await connection
    .execute<ResultSetHeader>(query, [username, classe, level, password]);

  const createdUser: User = {
    id: createdRowUser.insertId,
    username,
    classe,
    level,
  };

  return createdUser;
};

const findByUserName = async (username: string): Promise<RowDataPacket> => {
  const query = `
    SELECT
      *
    FROM
      Trybesmith.Users
    WHERE
      username = ?
  `;

  const [user] = await connection.execute<RowDataPacket[]>(query, [username]);

  return user[0];
};

const UserModel = {
  getAll,
  create,
  findByUserName,
};

export default UserModel;
