import { useActionState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { addTask, taskKeys } from '../api';

export const AddTaskForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();

    const addTaskAction = async (_prev: string | null, formData: FormData): Promise<string | null> => {
        try {
            await addTask(formData.get('name') as string);
            await queryClient.invalidateQueries({ queryKey: taskKeys.all });
            formRef.current?.reset();
            return null;
        } catch (err) {
            return err instanceof Error ? err.message : 'Something went wrong';
        }
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
