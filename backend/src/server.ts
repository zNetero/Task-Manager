import http from 'http';
import { Server } from 'socket.io';
import { app } from './app.js';

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

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado. ID: ${socket.id}`);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP rodando na porta ${PORT}`);
    console.log(`Swagger disponivel em http://localhost:${PORT}/api-docs`);
})