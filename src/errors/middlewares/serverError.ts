import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../../types';

const serverError: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro inesperado.' });
};

export default serverError;
