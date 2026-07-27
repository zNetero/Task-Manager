import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API REST para gerenciar estado inicial do quadro de tarefas',
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Servidor de desenvolvimento',
        },
    ],    
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);