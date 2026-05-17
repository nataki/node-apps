import { useQuery } from '@tanstack/react-query';
import { fetchAllTasks, taskKeys } from '../api';
import { TaskItem } from './TaskItem';

export const TasksList = () => {
    const { data: tasks = [], isLoading, error } = useQuery({
        queryKey: taskKeys.all,
        queryFn: fetchAllTasks,
    });

    if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
    if (error) return <p className="text-sm text-red-500">{error.message}</p>;

    if (tasks.length === 0) return (
        <p className="text-sm text-gray-400 text-center py-8">No tasks yet. Add one above.</p>
    );

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
};
