import { useDroppable } from '@dnd-kit/core';
import { type Task, type TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
    id: TaskStatus;
    label: string;
    tasks: Task[];
}

export function Column({ id, label, tasks}: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    })
    
    return (
    <div
      ref={setNodeRef}
      className={`rounded-lg w-72 min-w-[18rem] p-4 flex flex-col transition-colors border-2 ${
        isOver
          ? 'bg-blue-50 border-blue-300 border-dashed'
          : 'bg-gray-50 border-transparent'
      }`}
    >
      <h3 className="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-4">
        {label}
      </h3>

      <div className="flex flex-col flex-1 min-h-[150px]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}