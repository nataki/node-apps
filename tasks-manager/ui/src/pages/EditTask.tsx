import { useEffect, useState, useActionState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { fetchTask, updateTask } from '../api';
import type { TTask } from '../types';

export const EditTask = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [task, setTask] = useState<TTask | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchTask(id).then((result) => {
            if (result.success) setTask(result.data);
            else setLoadError(result.error);
        });
    }, [id]);

    const editTaskAction = async (_prev: string | null, formData: FormData): Promise<string | null> => {
        const result = await updateTask(id!, {
            name: formData.get('name') as string,
            completed: formData.get('completed') === 'on',
        });
        if (!result.success) return result.error;
        navigate('/');
        return null;
    };

    const [submitError, dispatch, isPending] = useActionState(editTaskAction, null);

    if (loadError) return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <p className="text-sm text-red-500">{loadError}</p>
            <Link to="/" className="text-sm text-violet-600 hover:underline mt-4 inline-block">← Back</Link>
        </div>
    );

    if (!task) return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <p className="text-sm text-gray-500">Loading...</p>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <Link to="/" className="text-sm text-violet-600 hover:underline mb-6 inline-block">← Back</Link>
            <h1 className="text-2xl font-semibold mb-6">Edit task</h1>
            <form action={dispatch} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    defaultValue={task.name}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-800"
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="completed"
                        defaultChecked={task.completed}
                        className="h-4 w-4 rounded border-gray-300 accent-violet-600"
                    />
                    Completed
                </label>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                        Save
                    </button>
                    <Link
                        to="/"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </Link>
                </div>
                {submitError && <p className="text-sm text-red-500">{submitError}</p>}
            </form>
        </div>
    );
};
