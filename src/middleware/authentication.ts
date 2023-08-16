// middleware/authentication.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secret: string = <string>process.env.JWT_SECRET;    
    const decoded = jwt.verify(token, secret);
    // @ts-ignore
    req["user"] = <jwt.JwtPayload>decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
