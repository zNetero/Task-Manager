import { Router } from 'express';
import { tasksStore } from '../store/index.js';

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retorna a lista completa de tarefas
 *     description: Utilizado pelo frontend para carregar o estado inicial do quadro.
 *     responses:
 *       200:
 *         description: Uma lista de tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 */

router.get('/tasks', (req, res) => {
  res.json(tasksStore);
});

export default router;