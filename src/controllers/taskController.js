import {
  createTaskService,
  updateTaskServices,
  getTasksServices,
  getTaskByIdServices,
  updateTaskStatusService,
  deleteTaskServices,
} from "../services/taskService.js";
import mongoose from "mongoose";

export async function createTask(req, res) {
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

  try {
    const newTask = await createTaskService(title, description);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar tarefa",
    });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await getTasksServices();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao buscar as tarefas",
    });
  }
}

export async function getTaskById(req, res) {
  const taskId = req.params.id;
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }

  try {
    const task = await getTaskByIdServices(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Tarefa nao encontrada",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao buscar tarefa",
    });
  }
}

export async function updateTask(req, res) {
  const taskId = req.params.id;
  if (!mongoose.isObjectIdOrHexString(taskId)) {
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
  try {
    const updatedTask = await updateTaskServices(taskId, title, description);
    if (!updatedTask) {
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao editar tarefa ",
    });
  }
}

export async function updateTaskStatus(req, res) {
  const taskId = req.params.id;
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "O completed deve ser do tipo boolean",
    });
  }
  try {
    const task = await updateTaskStatusService(taskId, completed);

    if (!task) {
      return res.status(404).json({
        message: "tarefa nao encontrada",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao editar tarefa",
    });
  }
}

export async function deleteTask(req, res) {
  const taskId = req.params.id;
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    return res.status(400).json({
      message: "ID inválido",
    });
  }

  try {
    const deleted = await deleteTaskServices(taskId);

    if (!deleted) {
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      message: "Tarefa excluida",
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Erro ao deletar tarefa"
    })
  }
}
