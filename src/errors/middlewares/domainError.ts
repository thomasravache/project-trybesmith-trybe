import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { DomainError } from '../../types';

const domainError: ErrorRequestHandler = (
  err: DomainError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.domain) {
    return res.status(err.code).json({ error: err.message });
  }

  return next(err);
};

export default domainError;
