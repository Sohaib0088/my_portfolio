import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';

const router = express.Router();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Auth middleware for admin routes
const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, error: 'Unauthorized: User not found' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res
        .status(401)
        .json({ success: false, error: 'Unauthorized: Invalid token' });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, error: 'Unauthorized: No token provided' });
  }
};

// Get all contacts (admin only)
router.get('/', protect, async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get a single contact (admin only)
router.get('/:id', protect, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Get contact error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Create a new contact
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, subject, and message',
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error('Create contact error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Mark contact as read (admin only)
router.put('/:id/read', protect, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true },
    });

    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Mark contact as read error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete a contact (admin only)
router.delete('/:id', protect, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contact.delete({
      where: { id },
    });

    return res.json({ success: true, data: { message: 'Contact deleted successfully' } });
  } catch (error) {
    console.error('Delete contact error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
