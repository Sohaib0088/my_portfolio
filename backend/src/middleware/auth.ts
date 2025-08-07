// middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

// ✅ Extend Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// ✅ PROTECT MIDDLEWARE
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_secret'
      ) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
      }

      // ✅ Normalize role to lowercase
      req.user = {
        ...user,
        role: user.role?.toLowerCase()
      };

      return next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Token failed' });
    }
  }

  return res
    .status(401)
    .json({ success: false, error: 'Not authorized, no token' });
};

// ✅ ADMIN MIDDLEWARE
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log('🛡️ Admin Middleware Check - req.user:', req.user);

  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    console.log('❌ Forbidden - User is not admin');
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
}; 