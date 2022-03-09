// import { RowDataPacket } from 'mysql2';
import { Request } from 'express';
import CustomJwtPayload from './CustomJwtPayload';

interface CustomRequest extends Request {
  tokenPayload?: CustomJwtPayload;
}

export default CustomRequest;
