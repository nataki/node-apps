import { useTransition } from 'react';
import { Link } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTask, taskKeys } from '../api';
import type { TTask } from '../types';
import { IconCheck } from '../assets/icons/IconCheck';
import { IconPencil } from '../assets/icons/IconPencil';
import { IconTrash } from '../assets/icons/IconTrash';

type TProps = {
    task: TTask;
};

export const TaskItem = ({ task }: TProps) => {
    const [isDeleting, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteTask(task.id);
                await queryClient.invalidateQueries({ queryKey: taskKeys.all });
            } catch {
                // silently ignored; could be surfaced via a toast in the future
            }
        });
    };

    return (
        <li className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 ${task.completed ? 'border-green-500 text-green-500' : 'border-gray-300 dark:border-gray-600'}`}>
                {task.completed && <IconCheck />}
            </span>
            <span className={`flex-1 text-left ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                {task.name}
            </span>
            <div className="flex items-center gap-1 shrink-0">
                <Link
                    to={`/tasks/${task.id}/edit`}
                    className="p-1.5 rounded text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950"
                    aria-label="Edit task"
                >
                    <IconPencil />
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-40"
                    aria-label="Delete task"
                >
                    <IconTrash />
                </button>
            </div>
        </li>
    );
};
