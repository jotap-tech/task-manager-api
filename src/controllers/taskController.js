import {
  createTaskService,
  updateTaskServices,
  getTasksServices,
  getTaskByIdServices,
  updateTaskStatusService,
  deleteTaskServices,
} from "../services/taskService.js";

export function createTask(req, res) {
  const { title, description } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "O título é obrigatório",
    });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "Descricao invalida",
    });
  }
  const newTask = createTaskService(title, description);
  return res.status(201).json(newTask);
}

export function getTasks(req, res) {
  const getTasksList = getTasksServices();
  return res.status(200).json(getTasksList);
}

export function getTaskById(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }
  const task = getTaskByIdServices(taskId);

  if (!task) {
    return res.status(404).json({
      message: "Tarefa nao encontrada",
    });
  }
  return res.status(200).json(task);
}

export function updateTask(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }

  const { title, description } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "O título é obrigatório",
    });
  }

  if (typeof description !== "string") {
    return res.status(400).json({
      message: "Descrição inválida",
    });
  }

  const updatedTask = updateTaskServices(taskId, title, description);

  if (!updatedTask) {
    return res.status(404).json({
      message: "Tarefa não encontrada",
    });
  }

  return res.status(200).json(updatedTask);
}

export function updateTaskStatus(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "O completed deve ser dd tipo boolean",
    });
  }

  const task = updateTaskStatusService(taskId, completed);

  if (!task) {
    return res.status(404).json({
      message: "tarefa nao encontrada",
    });
  }

  return res.status(200).json(task);
}

export function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }
  const deleted = deleteTaskServices(taskId);

  if (!deleted) {
    return res.status(404).json({
      message: "Tarefa não encontrada",
    });
  }

  return res.status(200).json({
    message: "Tarefa excluida",
  });
}