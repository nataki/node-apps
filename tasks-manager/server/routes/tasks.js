const express = require('express');
const router = express.Router();
const prisma = require('../db/connect');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, msg: 'Please provide a task name' });
    const task = await prisma.task.create({ data: { name } });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
});

module.exports = router;
