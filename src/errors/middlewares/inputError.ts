import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { JoiStatusCodes, StatusCodes } from '../../types';

const joiStatusCodes: JoiStatusCodes = {
  'any.required': StatusCodes.BAD_REQUEST,
  'string.base': StatusCodes.UNPROCESSABLE_ENTITY,
  'string.min': StatusCodes.UNPROCESSABLE_ENTITY,
  'number.base': StatusCodes.UNPROCESSABLE_ENTITY,
  'number.min': StatusCodes.UNPROCESSABLE_ENTITY,
};

const inputError: ErrorRequestHandler = (
  err: ValidationError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.isJoi) {
    const { details } = err;
    const { type, message } = details[0];
    console.log(type);

    const statusCode = joiStatusCodes[type] || 404;

    return res.status(statusCode).json({ error: message });
  }

  return next(err);
};

export default inputError;
