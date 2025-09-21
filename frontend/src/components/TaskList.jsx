import { useEffect, useState } from "react";
import useTaskStore from "../store/useTaskStore";
import { Trash2 } from "lucide-react";

const TaskList = () => {
  const {
    tasks,
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    isFetchingTasks,
  } = useTaskStore();
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  const handleDeleteTask = (e, taskId) => {
    e.stopPropagation(); // Prevent the li's onClick from firing
    deleteTask(taskId);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="input input-bordered w-full mr-2"
        />
        <button onClick={handleAddTask} className="btn btn-primary">
          Add
        </button>
      </div>
      {isFetchingTasks ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-base-200"
              onClick={() => toggleTask(task._id, !task.completed)}
            >
              <span
                className={`${task.completed ? "line-through" : ""}`}
              >
                {task.title}
              </span>
              <button
                onClick={(e) => handleDeleteTask(e, task._id)}
                className="btn btn-ghost btn-sm"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
