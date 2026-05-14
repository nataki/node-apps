import './App.css'
import {AddTaskForm} from "./components/AddTaskForm.tsx";
import {TasksList} from "./components/TasksList.tsx";

function App() {
  return (
    <>
      <h4>Tasks manager</h4>
      <AddTaskForm />
      <TasksList />
    </>
  )
}

export default App
