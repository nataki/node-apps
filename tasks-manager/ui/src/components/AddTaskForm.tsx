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
        <form ref={formRef} action={dispatchAction}>
            <input type="text" name="name" placeholder="Task Name" />
            <button type="submit" disabled={isPending}>Add Task</button>
            {submitError && <p>{submitError}</p>}
        </form>
    );
};
