import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/status", updateTaskStatus);
router.delete("/tasks/:id", deleteTask);

export default router;
