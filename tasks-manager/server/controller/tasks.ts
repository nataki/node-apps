import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../db/connect';

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;
const MAX_NAME_LENGTH = 500;

const isValidId = (id: string) => OBJECT_ID_RE.test(id);

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    if (!name) return res.status(400).json({ success: false, msg: 'Please provide a task name' });
    if (name.length > MAX_NAME_LENGTH) return res.status(400).json({ success: false, msg: `Task name must be ${MAX_NAME_LENGTH} characters or fewer` });
    const task = await prisma.task.create({ data: { name } });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    const updates: { name?: string; completed?: boolean } = {};
    if (typeof req.body.name === 'string') {
      const name = req.body.name.trim();
      if (!name) return res.status(400).json({ success: false, msg: 'Task name cannot be empty' });
      if (name.length > MAX_NAME_LENGTH) return res.status(400).json({ success: false, msg: `Task name must be ${MAX_NAME_LENGTH} characters or fewer` });
      updates.name = name;
    }
    if (typeof req.body.completed === 'boolean') updates.completed = req.body.completed;
    if (Object.keys(updates).length === 0) return res.status(400).json({ success: false, msg: 'No valid fields to update' });
    const task = await prisma.task.update({ where: { id: req.params.id }, data: updates });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025')
      return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025')
      return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
};
