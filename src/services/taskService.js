import tasks from "../data/taskStore.js";


export function createTaskService(title, description) {
  const newTask = {
    id: Date.now(),
    title: title.trim(),
    description,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  return newTask;
}

export function getTasksServices() {
  return tasks;
}

export function getTaskByIdServices(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  return task
}

export function updateTaskServices(taskId, title, description) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex].title = title.trim();
  tasks[taskIndex].description = description.trim();

  return tasks[taskIndex];
}

export function updateTaskStatusService(taskId, completed) {
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return null;
  }

  task.completed = completed;
  return task
}

export function deleteTaskServices(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return false;
  }
  tasks.splice(taskIndex, 1);
}