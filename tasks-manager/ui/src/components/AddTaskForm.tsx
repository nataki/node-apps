import { useActionState, useRef } from 'react';
import { addTask } from '../api';

type TProps = { onTaskAdded: () => void };

export const AddTaskForm = ({ onTaskAdded }: TProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const addTaskAction = async (_prev: string | null, formData: FormData): Promise<string | null> => {
        const result = await addTask(formData.get('name') as string);
        const error = result.success ? null : result.error;
        if (!error) {
            onTaskAdded();
            formRef.current?.reset();
        }
        return error;
    };

    const [submitError, dispatch, isPending] = useActionState(addTaskAction, null);

    return (
        <form ref={formRef} action={dispatch} className="flex flex-col gap-0 mb-6">
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
