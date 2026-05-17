import { AddTaskForm } from '../components/AddTaskForm';
import { TasksList } from '../components/TasksList';

export const Home = () => (
    <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Tasks manager</h1>
        <AddTaskForm />
        <TasksList />
    </div>
);
