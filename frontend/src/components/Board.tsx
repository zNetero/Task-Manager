import { useState, useEffect } from 'react';
import { type Task, type TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Column } from './Column';

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'TODO', label: 'A Fazer' },
  { id: 'IN_PROGRESS', label: 'Fazendo' },
  { id: 'DONE', label: 'Concluído' }
];

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Erro ao buscar tarefas:", error));
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(!over) return;

    const activeId = String(active.id);
    const newStatus = over.id as TaskStatus;

    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === activeId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    )
  }

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