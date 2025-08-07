import express, { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: 'Project not found' });
    }

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, admin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      technologies,
      featured,
      order,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        technologies: JSON.stringify(technologies),
        featured: featured || false,
        order: order || 0,
      },
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      technologies,
      featured,
      order,
    } = req.body;

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        technologies: technologies
          ? JSON.stringify(technologies)
          : undefined,
        featured,
        order,
      },
    });

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id },
    });

    return res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
