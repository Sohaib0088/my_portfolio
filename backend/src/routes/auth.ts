import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

// Local protect middleware
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true }
      });
      if (!user) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
      }
      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

const router = express.Router();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';
const signOptions: any = { expiresIn: JWT_EXPIRES_IN };

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true }
    });
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      signOptions
    );
    return res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      signOptions
    );
    return res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
      select: { id: true, name: true, email: true, role: true }
    });
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 