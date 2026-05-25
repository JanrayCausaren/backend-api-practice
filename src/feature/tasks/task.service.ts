import type { CreateTask, Task, UpdateTask } from "./task.types.js";

let tasks: Task[] = [
  {
    id: 1,
    title: "Study Express",
    completed: false,
  },
  {
    id: 2,
    title: "Study Express2",
    completed: false,
  },
  {
    id: 3,
    title: "Study Express3",
    completed: false,
  },
  {
    id: 4,
    title: "Study Express4",
    completed: false,
  },
];

export async function getTaskService(): Promise<Task[]> {
  return tasks;
}

export async function getTaskByIdService(id: number): Promise<Task | null> {
  const task = tasks.find((value) => value.id === id);

  return task || null;
}

export async function createTaskService(task: CreateTask): Promise<Task> {
  const newTask: Task = {
    id: tasks.length + 1,
    title: task.title,
    completed: task.completed ?? false,
  };

  tasks.push(newTask);

  console.log(newTask);
  console.log(tasks);
  return newTask;
}

export async function updateTaskService(
  id: number,
  updates: UpdateTask,
): Promise<UpdateTask | null> {
  const task = tasks.find((value) => value.id === id);

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }

  if (updates.completed !== undefined) {
    task.completed = updates.completed;
  }
  console.log(task);

  return task;
}
