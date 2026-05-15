import type { TTask } from '../types';
import { TaskItem } from './TaskItem';

type TProps = {
    tasks: TTask[];
    isLoading: boolean;
    error: string | null;
    onTaskDeleted: () => void;
};

export const TasksList = ({ tasks, isLoading, error, onTaskDeleted }: TProps) => {
    if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
    if (error) return <p className="text-sm text-red-500">{error}</p>;

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDeleted={onTaskDeleted} />
            ))}
        </ul>
    );
};
