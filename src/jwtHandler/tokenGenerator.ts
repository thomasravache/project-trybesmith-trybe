import jwt, { Secret } from 'jsonwebtoken';
import { JwtOptions, CustomJwtPayload } from '../types';

const generateToken = (
  payload: CustomJwtPayload,
  secret: Secret,
  options: JwtOptions,
) => jwt.sign(payload, secret, options);

export default generateToken;
