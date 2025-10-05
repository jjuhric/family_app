import Task from "../models/task.model.js";

/**
 * GET /api/tasks
 * Return tasks belonging to the authenticated user
 */
export const getTasks = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("getTasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/tasks
 * Create a task for the authenticated user
 */
export const createTask = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, dueDate, completed } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description || "",
      dueDate: dueDate || undefined,
      completed: !!completed,
      userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("createTask error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/tasks/:id
 * Update a task (only owner can update)
 */
export const updateTask = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const updates = req.body || {};

    // Ensure we only allow specific fields to be updated
    const allowed = {};
    if (typeof updates.title !== "undefined") allowed.title = updates.title;
    if (typeof updates.description !== "undefined")
      allowed.description = updates.description;
    if (typeof updates.completed !== "undefined") allowed.completed = updates.completed;
    if (typeof updates.dueDate !== "undefined") allowed.dueDate = updates.dueDate;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: allowed },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    console.error("updateTask error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete a task (only owner)
 */
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const deleted = await Task.findOneAndDelete({ _id: id, userId });

    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("deleteTask error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};