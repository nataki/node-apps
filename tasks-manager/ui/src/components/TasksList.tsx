import type { TTask } from '../types';

type TProps = {
    tasks: TTask[];
    isLoading: boolean;
    error: string | null;
};

export const TasksList = ({ tasks, isLoading, error }: TProps) => {
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
