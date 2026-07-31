import http from 'http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { tasksStore } from './store/index.js';
import { type TaskStatus } from './types/index.js';
import { type Task } from './types/index.js';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

//Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`Novo usuário conectado! ID: ${socket.id}`);

    socket.on('task:move', (data: { taskId: string; newStatus: TaskStatus }) => {
        const { taskId, newStatus } = data;

        const taskIndex = tasksStore.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            (tasksStore[taskIndex] as Task).status = newStatus;
            const updatedTask = tasksStore[taskIndex];
            console.log(`Tarefa [${taskId}] movida para [${newStatus}] pelo usuário [${socket.id}]`);

            io.emit('task:updated', updatedTask);
        }
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP rodando na porta ${PORT}`);
    console.log(`Swagger disponivel em http://localhost:${PORT}/api-docs`);
})