import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../service/UserService';
import { StatusCodes, UserRequest } from '../types';
import { userSchema, validateSchema } from './schemas';

const userRoutes = Router();

userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userInfo: UserRequest = req.body;

  try {
    validateSchema<UserRequest>(userSchema, userInfo);

    const token = await UserService.create(userInfo);
  
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    return next(e);
  }
});

export default userRoutes;
