import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', taskRoutes);

app.get('./health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor rodando' });
})

export { app };

