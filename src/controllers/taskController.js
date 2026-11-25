import tasks from "../data/taskStore.js";


export function createTask(req, res) {
  const { title, description } = req.body;
  
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "O título é obrigatório",
    });
  }
  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
    created: new Date(),
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
}

export function getTasks(req, res) {
  return res.status(200).json(tasks);
}

export function getTaskById(req, res) {
  const taskId = Number(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Tarefa nao encontrada",
    });
  }
  return res.status(200).json(task);
}

export function updateTask(req, res) {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const { title, description } = req.body;

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Tarefa nao encontrada",
    });
  }
  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  return res.status(200).json(tasks[taskIndex]);
}

export function updateTaskStatus(req, res) {
  const taskId = Number(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  const { completed } = req.body;

  if (!task) {
    return res.status(404).json({
      message: "tarefa nao encontrada",
    });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "O completed deve ser dd tipo boolean",
    });
  }

  task.completed = completed;
  return res.status(200).json(task);
}

export function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "tarefa nao encontrada",
    });
  }

  tasks.splice(taskIndex, 1)
  return res.status(200).json({
    message: "Tarefa excluida"
  })
}