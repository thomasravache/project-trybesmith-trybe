import { Router, Request, Response, NextFunction } from 'express';
import LoginService from '../service/LoginService';
import { Login, StatusCodes } from '../types';
import { loginSchema, validateSchema } from './schemas';

const loginRoutes = Router();

loginRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const loginInfo: Login = req.body;

  try {
    validateSchema<Login>(loginSchema, loginInfo);

    const token = await LoginService.login(loginInfo);

    return res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    return next(e);
  }
});

export default loginRoutes;
