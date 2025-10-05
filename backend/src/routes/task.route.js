import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// GET /api/tasks        -> list tasks for the authenticated user
router.get("/", protectRoute, getTasks);

// POST /api/tasks       -> create a new task
router.post("/", protectRoute, createTask);

// PUT /api/tasks/:id    -> update task (e.g. toggle completed)
router.put("/:id", protectRoute, updateTask);

// DELETE /api/tasks/:id -> delete task
router.delete("/:id", protectRoute, deleteTask);

export default router;