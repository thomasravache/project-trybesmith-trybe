import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel';
import { StatusCodes, CustomRequest, CustomJwtPayload } from '../../types';

const { JWT_SECRET = 'shhhhh' } = process.env;

const authentication = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });

  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as CustomJwtPayload; // Se a verificação for inválida lança erro

    const user = await UserModel.findByUserName(payload.username);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Error to find token user' });
    }

    req.tokenPayload = payload;

    return next();
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export default authentication;
