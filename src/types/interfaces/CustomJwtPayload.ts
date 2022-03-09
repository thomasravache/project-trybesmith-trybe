import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: number;
  username: string;
}

export default CustomJwtPayload;
