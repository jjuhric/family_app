import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getTasks: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      userId: req.user._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in createTask: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTask: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};