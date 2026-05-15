import { Router } from 'express';
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from '../controller/tasks';

const router = Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
