import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../service/UserService';
import { StatusCodes, User } from '../types';
import { userSchema, validateSchema } from './schemas';

const userRoutes = Router();

userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userInfo: User = req.body;

  try {
    validateSchema<User>(userSchema, userInfo);

    const token = await UserService.create(userInfo);
  
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    return next(e);
  }
});

export default userRoutes;
