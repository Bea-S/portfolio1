/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Agenda uma nova consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 example: 1
 *               doctorId:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 example: 2025-09-01
 *               reason:
 *                 type: string
 *                 example: Consulta de rotina
 *     responses:
 *       201:
 *         description: Consulta agendada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 patientId:
 *                   type: integer
 *                   example: 1
 *                 doctorId:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   example: 2025-09-01
 *                 reason:
 *                   type: string
 *                   example: Consulta de rotina
 *   get:
 *     summary: Lista todas as consultas agendadas
 *     responses:
 *       200:
 *         description: Lista de consultas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   patientId:
 *                     type: integer
 *                     example: 1
 *                   doctorId:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: 2025-09-01
 *                   reason:
 *                     type: string
 *                     example: Consulta de rotina
 */
/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Busca consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 patientId:
 *                   type: integer
 *                   example: 1
 *                 doctorId:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   example: 2025-09-01
 *                 reason:
 *                   type: string
 *                   example: Consulta de rotina
 *       404:
 *         description: Consulta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Agendamento não encontrado
 *   put:
 *     summary: Atualiza consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 example: 1
 *               doctorId:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 example: 2025-09-01
 *               reason:
 *                 type: string
 *                 example: Retorno
 *     responses:
 *       200:
 *         description: Consulta atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 patientId:
 *                   type: integer
 *                   example: 1
 *                 doctorId:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   example: 2025-09-01
 *                 reason:
 *                   type: string
 *                   example: Retorno
 *       404:
 *         description: Consulta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Agendamento não encontrado
 *   delete:
 *     summary: Remove consulta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Consulta removida
 *       404:
 *         description: Consulta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Agendamento não encontrado
 */
const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAppointments);
router.get('/:id', appointmentsController.getAppointmentById);
router.put('/:id', appointmentsController.updateAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;
