import jwt, { Secret } from 'jsonwebtoken';
import { JwtOptions, JwtPayload } from '../types';

const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  options: JwtOptions,
) => jwt.sign(payload, secret, options);

export default generateToken;
