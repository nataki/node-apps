import type { Task } from '../types';

type Props = {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
};

export const TasksList = ({ tasks, isLoading, error }: Props) => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.name}</li>
            ))}
        </ul>
    );
};
