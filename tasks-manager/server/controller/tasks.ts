import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../db/connect';

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
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, msg: 'Please provide a task name' });
    const task = await prisma.task.create({ data: { name } });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { name, completed } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { name, completed },
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025')
      return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025')
      return res.status(404).json({ success: false, msg: `No task with id ${req.params.id}` });
    next(err);
  }
};
