import generateToken from '../jwtHandler/tokenGenerator';
import UserModel from '../models/UserModel';
import { JwtOptions, CustomJwtPayload, UserRequest } from '../types';

const { JWT_SECRET = 'shhhhh' } = process.env;

const jwtOptions: JwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const create = async ({ username, classe, level, password }: UserRequest): Promise<string> => {
  const newUser = await UserModel.create({ username, classe, level, password });

  const jwtPayload: CustomJwtPayload = {
    userId: newUser.id,
    username: newUser.username,
  };

  const token = generateToken(jwtPayload, JWT_SECRET, jwtOptions);

  return token;
};

const UserService = {
  create,
};

export default UserService;
