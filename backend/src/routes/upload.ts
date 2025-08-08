import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// Create uploads directory if it doesn't exist (dist/uploads)
// For TS build output (dist/src/routes -> dist/uploads), go two levels up
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10) // 5MB default
  },
  fileFilter
});

// @desc    Upload image
// @route   POST /api/upload/image
// @access  Private/Admin
router.post(
  '/image',
  protect,
  admin,
  upload.single('image'),
  (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      return res.json({
        success: true,
        data: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          url: fileUrl,
          size: req.file.size
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  }
);

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
router.delete(
  '/:filename',
  protect,
  admin,
  (req: Request, res: Response) => {
    try {
      const filename = req.params.filename;
      const filepath = path.join(uploadDir, filename);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return res.json({
          success: true,
          message: 'File deleted successfully'
        });
      } else {
        return res.status(404).json({
          success: false,
          error: 'File not found'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  }
);

export default router;
