import type { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return <p className="text-gray-500">Loading…</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
