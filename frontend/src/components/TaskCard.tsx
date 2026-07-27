import { type Task } from '../types/index';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-3 cursor-grab hover:shadow-md transition-shadow">
      <h4 className="text-gray-800 font-medium mb-1">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-500 m-0">
          {task.description}
        </p>
      )}
    </div>
  );
}