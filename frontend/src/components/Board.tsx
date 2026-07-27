import { useState } from 'react';
import { type Task, type TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'TODO', label: 'A Fazer' },
  { id: 'IN_PROGRESS', label: 'Fazendo' },
  { id: 'DONE', label: 'Concluído' }
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Configurar WebSocket', description: 'Conectar frontend e backend', status: 'DONE' },
  { id: '2', title: 'Criar UI do Quadro', description: 'Desenhar colunas e cards', status: 'IN_PROGRESS' },
  { id: '3', title: 'Implementar Realtime', description: 'Sincronizar com o backend', status: 'TODO' },
];

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  return (
    <div className="flex gap-5 p-5 overflow-x-auto bg-gray-100 min-h-[70vh] rounded-lg">
      {COLUMNS.map(col => (
        <div key={col.id} className="bg-gray-50 rounded-lg w-72 min-w-[18rem] p-4 flex flex-col">
          <h3 className="text-gray-700 font-semibold border-b-2 border-gray-200 pb-2 mb-4">
            {col.label}
          </h3>
          
          <div className="flex flex-col flex-1 min-h-[100px]">
            {tasks
              .filter(t => t.status === col.id)
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}