import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

export default CustomJwtPayload;
