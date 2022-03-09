// import { RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { CustomJwtPayload } from '.';

interface CustomRequest extends Request {
  tokenPayload?: CustomJwtPayload;
}

export default CustomRequest;
