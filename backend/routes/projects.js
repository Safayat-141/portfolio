const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const requireAuth = require('../middleware/requireAuth');

// ---------- PUBLIC ----------

// GET /api/projects - published only, sorted by order
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published' }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

// GET /api/projects/admin/all - ALL statuses, protected
// NOTE: defined before /:slug so "admin" isn't treated as a slug
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

// GET /api/projects/:slug - published only
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: 'published',
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching project' });
  }
});

// ---------- PROTECTED (ADMIN) ----------

// POST /api/projects - create
router.post('/', requireAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
});

// PUT /api/projects/:id - update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting project' });
  }
});

module.exports = router;
