import Task from "../models/Task.js";

export async function createTaskService(title, description) {
  const newTask = await Task.create({
    title: title.trim(),
    description,
  });
  return newTask;
}

export async function getTasksServices() {
  return await Task.find();
}

export async function getTaskByIdServices(taskId) {
  const task = await Task.findById(taskId);
  return task;
}

export async function updateTaskServices(taskId, title, description) {
  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      title: title.trim(),
      description: description.trim(),
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return task;
}

export async function updateTaskStatusService(taskId, completed) {
 const task = await Task.findByIdAndUpdate(
    taskId,
    {
      completed: completed,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return task;
}

export async function deleteTaskServices(taskId) {
  const deletedTask = await Task.findByIdAndDelete(taskId);

  return deletedTask;
}
