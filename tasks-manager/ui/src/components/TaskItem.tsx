import { useState, useTransition } from 'react';
import { Link } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { deleteTask, updateTask, taskKeys } from '../api';
import type { TTask } from '../types';
import { IconCheck } from '../assets/icons/IconCheck';
import { IconPencil } from '../assets/icons/IconPencil';
import { IconTrash } from '../assets/icons/IconTrash';

type TProps = {
    task: TTask;
};

export const TaskItem = ({ task }: TProps) => {
    const [isDeleting, startDeleteTransition] = useTransition();
    const [isToggling, startToggleTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleToggle = () => {
        setError(null);
        startToggleTransition(async () => {
            try {
                await updateTask(task.id, { completed: !task.completed });
                await queryClient.invalidateQueries({ queryKey: taskKeys.all });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update task');
            }
        });
    };

    const handleDelete = () => {
        setError(null);
        startDeleteTransition(async () => {
            try {
                await deleteTask(task.id);
                await queryClient.invalidateQueries({ queryKey: taskKeys.all });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete task');
            }
        });
    };

    const isPending = isDeleting || isToggling;

    return (
        <li className="flex flex-col px-4 py-3 text-sm">
            <div className="flex items-center gap-3">
                <button
                    onClick={handleToggle}
                    disabled={isPending}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-colors disabled:opacity-40 ${task.completed ? 'border-green-500 text-green-500 hover:border-green-400 hover:text-green-400' : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 hover:text-violet-400'}`}
                >
                    {task.completed && <IconCheck />}
                </button>
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
                        disabled={isPending}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-40"
                        aria-label="Delete task"
                    >
                        <IconTrash />
                    </button>
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500 pl-8">{error}</p>}
        </li>
    );
};
