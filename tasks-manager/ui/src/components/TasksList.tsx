import { Link } from 'react-router';
import type { TTask } from '../types';

type TProps = {
    tasks: TTask[];
    isLoading: boolean;
    error: string | null;
};

export const TasksList = ({ tasks, isLoading, error }: TProps) => {
    if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
    if (error) return <p className="text-sm text-red-500">{error}</p>;

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700 text-left">
            {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span>{task.name}</span>
                    <Link
                        to={`/tasks/${task.id}/edit`}
                        className="text-violet-600 hover:underline ml-4 shrink-0"
                    >
                        Edit
                    </Link>
                </li>
            ))}
        </ul>
    );
};
