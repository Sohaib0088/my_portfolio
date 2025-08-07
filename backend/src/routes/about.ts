import express from 'express';
import { prisma } from '../lib/prisma';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @desc    Get about content
// @route   GET /api/about
// @access  Public
router.get('/', async (req, res) => {
  try {
    const about = await prisma.about.findMany({
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Create about content
// @route   POST /api/about
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, content, imageUrl, order } = req.body;

    const about = await prisma.about.create({
      data: {
        title,
        content,
        imageUrl,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Update about content
// @route   PUT /api/about/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, content, imageUrl, order } = req.body;

    const about = await prisma.about.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        imageUrl,
        order
      }
    });

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Delete about content
// @route   DELETE /api/about/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await prisma.about.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 