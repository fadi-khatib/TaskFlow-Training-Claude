import type { Task } from './types';

export type TaskPatch = Partial<
  Pick<Task, 'title' | 'description' | 'due_date' | 'completed' | 'feedback'>
>;

export function buildTaskUpdate(existing: Task, patch: TaskPatch): Task {
  return {
    ...existing,
    title: patch.title ?? existing.title,
    description: patch.description ?? existing.description,
    due_date: patch.due_date ?? existing.due_date,
    completed: patch.completed ?? existing.completed,
    feedback: patch.feedback ?? existing.feedback,
  };
}
