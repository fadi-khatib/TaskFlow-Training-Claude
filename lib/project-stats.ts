import { getDb } from './db';

export interface ProjectStats {
  taskCount: number;
  completedCount: number;
}

export function getProjectStats(projectId: number): ProjectStats {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) AS taskCount,
         SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS completedCount
       FROM Task
       WHERE project_id = ?`,
    )
    .get(projectId) as { taskCount: number; completedCount: number | null };

  return { taskCount: row.taskCount, completedCount: row.completedCount ?? 0 };
}
