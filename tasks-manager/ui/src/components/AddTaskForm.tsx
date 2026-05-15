import { useActionState, useRef } from 'react';
import { addTask } from '../api';

type Props = { onTaskAdded: () => void };

export const AddTaskForm = ({ onTaskAdded }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleAddTaskSubmit = async (_prevState: string | null, formData: FormData): Promise<string | null> => {
        const name = formData.get('name') as string;
        const result = await addTask(name);
        if (!result.success) return result.error;
        onTaskAdded();
        formRef.current?.reset();
        return null;
    };

    const [submitError, dispatchAction, isPending] = useActionState(handleAddTaskSubmit, null);

    return (
        <form ref={formRef} action={dispatchAction} className="flex flex-col gap-0 mb-6">
            <div className="flex mb-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Task name"
                    className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-r-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                >
                    Add
                </button>
            </div>

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        </form>
    );
};
