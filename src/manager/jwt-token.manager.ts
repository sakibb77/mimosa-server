import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export default class JWTTokenManager {
  private readonly secret: string;
  private readonly expriesIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expriesIn = '7d';
  }

  public createToken(id: string): string {
    try {
      const token = jwt.sign({ id }, this.secret, {
        expiresIn: this.expriesIn,
      });

      return token;
    } catch (error) {
      throw new Error('token creation failed');
    }
  }

  public verifyToken(token: string): JwtPayload | string | object {
    try {
      const payload = jwt.verify(token, this.secret);

      return payload;
    } catch (error) {
      throw new Error('token verification failed');
    }
  }
}
