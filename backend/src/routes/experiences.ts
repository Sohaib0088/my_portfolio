import express from 'express';
import { prisma } from '../lib/prisma';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Create experience
// @route   POST /api/experiences
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, company, location, startDate, endDate, current, description, technologies, order } = req.body;

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        technologies: technologies ? JSON.stringify(technologies) : null,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, company, location, startDate, endDate, current, description, technologies, order } = req.body;

    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: {
        title,
        company,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
        technologies: technologies ? JSON.stringify(technologies) : null,
        order
      }
    });

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await prisma.experience.delete({
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