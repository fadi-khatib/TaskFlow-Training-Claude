import { getDb } from './db';
import type { Task } from './types';

export function getDashboardTasks(): Task[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM Task ORDER BY due_date IS NULL, due_date ASC')
    .all() as Task[];
}
