import { useCallback, useEffect, useState, useTransition } from "react";
import { fetchAllTasks } from "../api";
import { AddTaskForm } from "../components/AddTaskForm.tsx";
import { TasksList } from "../components/TasksList.tsx";
import type { TTask } from "../types.ts";

export const  Home = ()=> {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, startTransition] = useTransition();

    const loadTasks = useCallback(() => {
        startTransition(async () => {
            const result = await fetchAllTasks();
            if (result.success) {
                setTasks(result.data);
                setError(null);
            } else {
                setError(result.error);
            }
        });
    }, [startTransition]);

    useEffect(() => { loadTasks(); }, [loadTasks]);

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Tasks manager</h1>
            <AddTaskForm onTaskAdded={loadTasks} />
            <TasksList tasks={tasks} isLoading={isLoading} error={error} />
        </div>
    );
}