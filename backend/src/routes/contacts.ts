import express from 'express';
import { prisma } from '../lib/prisma';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Get all contacts (admin only)
// @route   GET /api/contacts
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Mark contact as read
// @route   PUT /api/contacts/:id/read
// @access  Private/Admin
router.put('/:id/read', protect, admin, async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { read: true }
    });

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await prisma.contact.delete({
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