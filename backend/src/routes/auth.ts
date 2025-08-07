import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { sendOTPEmail, sendLoginNotification } from '../lib/emailService';
export { protect };

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

const signOptions: SignOptions = {
  expiresIn: JWT_EXPIRES_IN as any
};

const router = express.Router();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

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
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
  }

  return res.status(401).json({ success: false, error: 'Not authorized, no token' });
};

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      signOptions
    );

    return res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    console.log('🔐 Logged-in user:', user);


    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      signOptions
    );

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Generate OTP
router.post('/request-otp', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Verify credentials first
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    
    // For development, always return success even if email fails
    console.log('\n' + '='.repeat(50));
    console.log(`🔐 OTP CODE FOR LOGIN 🔐`);
    console.log(`Email: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`Expires: ${new Date(Date.now() + 10 * 60 * 1000).toLocaleString()}`);
    console.log('='.repeat(50) + '\n');
    
    if (!emailSent) {
      console.log('⚠️ Email sending failed, but continuing for development');
    }

    // Send notification to admin email
    const adminEmail = 'sohaib021222@gmail.com';
    if (email !== adminEmail) {
      try {
        await sendLoginNotification(adminEmail, email);
      } catch (error) {
        console.log('⚠️ Admin notification failed, but continuing');
      }
    }

    return res.json({
      success: true,
      message: 'OTP sent to your email',
    });
  } catch (error) {
    console.error('Request OTP error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Verify OTP and login
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Please provide email and OTP' });
    }

    // Find the most recent valid OTP for this email
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        otp,
        expiresAt: { gt: new Date() },
        used: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return res.status(401).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // Get user details
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      signOptions
    );

    console.log('🔐 Logged-in user:', user);

    return res.json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
