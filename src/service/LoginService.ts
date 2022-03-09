import generatedError from '../errors/errorGenerator';
import generateToken from '../jwtHandler/tokenGenerator';
import UserModel from '../models/UserModel';
import { JwtOptions, CustomJwtPayload, Login, StatusCodes } from '../types';

const { JWT_SECRET = 'shhhhh' } = process.env;

const jwtOptions: JwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async ({ username, password }: Login): Promise<string> => {
  const user = await UserModel.findByUserName(username);

  if (!user || user.password !== password) {
    throw generatedError('Username or password invalid', StatusCodes.UNAUTHORIZED);
  }

  const jwtPayload: CustomJwtPayload = {
    userId: user.id,
    username,
  };

  const token = generateToken(jwtPayload, JWT_SECRET, jwtOptions);

  return token;
};

const LoginService = {
  login,
};

export default LoginService;
