
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Lista todas as consultas
 *     responses:
 *       200:
 *         description: Lista de consultas
 *   post:
 *     summary: Cria uma nova consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Consulta criada
 *
 * /appointments/{id}:
 *   get:
 *     summary: Busca consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 *   put:
 *     summary: Atualiza consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta atualizada
 *       404:
 *         description: Consulta não encontrada
 *   delete:
 *     summary: Remove consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta removida
 *       404:
 *         description: Consulta não encontrada
 */
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAll);
router.post('/', appointmentController.create);
router.get('/:id', appointmentController.getById);
router.put('/:id', appointmentController.update);
router.delete('/:id', appointmentController.delete);

module.exports = router;
