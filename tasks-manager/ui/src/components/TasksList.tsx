import { useEffect, useState } from "react";
import {fetchAllTasks} from "../api";


export const TasksList = () => {
    const [tasks, setTasks]= useState();

    useEffect(() => {
        (async () => {
           await fetchAllTasks().then((data) => {
               setTasks(data);
           })
        })();
    }, []);

    return (
        <>
            tasks: {JSON.stringify(tasks)}
        </>
    )
}