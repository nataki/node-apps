import {useActionState} from "react";
import {addTask} from "../api";

export const AddTaskForm = () => {
    const handleAddTaskSubmit = async (_prevState: null, formData: FormData): Promise<null> => {
        const name = formData.get('name') as string;
        await addTask(name);
        return null;
    }

    const [ ,dispatchAction, isPending] = useActionState(handleAddTaskSubmit, null);

    return (
        <>
            <h6>Add task form</h6>
            <form action={dispatchAction}>
                <input type="text" name="name" placeholder="Task Name" />
                <button type="submit" disabled={isPending}>Add Task</button>
            </form>
        </>
    )
}