import express from 'express';
import { prisma } from '../lib/prisma';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Create skill
// @route   POST /api/skills
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, category, level, icon, order } = req.body;

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        level: level || 1,
        icon,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, category, level, icon, order } = req.body;

    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: {
        name,
        category,
        level,
        icon,
        order
      }
    });

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await prisma.skill.delete({
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