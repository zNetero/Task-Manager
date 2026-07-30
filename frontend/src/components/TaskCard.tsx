import { type Task } from '../types/index';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      task,
    }
  })
  
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow touch-none"
    >
      <h4 className="text-gray-800 font-medium mb-1">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-500 m-0">
          {task.description}
        </p>
      )}
    </div>
  );
}