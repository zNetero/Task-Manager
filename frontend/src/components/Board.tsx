import { useState, useEffect } from 'react';
import { type Task, type TaskStatus } from '../types';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Column } from './Column';
import { useSocket } from '../contexts/SocketContext';

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'TODO', label: 'A Fazer' },
  { id: 'IN_PROGRESS', label: 'Fazendo' },
  { id: 'DONE', label: 'Concluído' }
];

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { socket } = useSocket();

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Erro ao buscar tarefas:", error));
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleTaskUpdated = (updatedTask: Task) => {
      console.log('Atualização em tempo real recebida:', updatedTask);

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    };

    socket.on('task:updated', handleTaskUpdated);

    return () => {
      socket.off('task:updated', handleTaskUpdated);
    };
  }, [socket]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const newStatus = over.id as TaskStatus;

    const currentTask = tasks.find(t => t.id === activeId);
    if (!currentTask || currentTask.status === newStatus) return;

    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === activeId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );

    if (socket) {
      socket.emit('task:move', { taskId: activeId, newStatus });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-5 p-5 overflow-x-auto bg-gray-100 min-h-[70vh] rounded-lg">
        {COLUMNS.map(col => (
          <Column
            key={col.id}
            id={col.id}
            label={col.label}
            tasks={tasks.filter(t => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}