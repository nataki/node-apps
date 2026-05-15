import { useActionState, useRef } from 'react';
import { addTask } from '../api';

type Props = { onTaskAdded: () => void };

export const AddTaskForm = ({ onTaskAdded }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleAddTaskSubmit = async (_prevState: null, formData: FormData): Promise<null> => {
        const name = formData.get('name') as string;
        await addTask(name);
        onTaskAdded();
        formRef.current?.reset();
        return null;
    };

    const [, dispatchAction, isPending] = useActionState(handleAddTaskSubmit, null);

    return (
        <form ref={formRef} action={dispatchAction}>
            <input type="text" name="name" placeholder="Task Name" />
            <button type="submit" disabled={isPending}>Add Task</button>
        </form>
    );
};
