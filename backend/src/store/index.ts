import { type Task } from '../types/index.js';

export const tasksStore: Task[] = [
  { id: '1', title: 'Configurar WebSocket', description: 'Conectar frontend e backend', status: 'DONE' },
  { id: '2', title: 'Criar UI do Quadro', description: 'Desenhar colunas e cards', status: 'IN_PROGRESS' },
  { id: '3', title: 'Implementar API REST', description: 'Buscar tarefas do servidor via Swagger', status: 'TODO' },
];