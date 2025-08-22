const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Cria um novo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João
 *               birthDate:
 *                 type: string
 *                 example: 1990-01-01
 *               phone:
 *                 type: string
 *                 example: 123456789
 *     responses:
 *       201:
 *         description: Paciente criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: João
 *                 birthDate:
 *                   type: string
 *                   example: 1990-01-01
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *   get:
 *     summary: Lista todos os pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
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
 *                   name:
 *                     type: string
 *                     example: João
 *                   birthDate:
 *                     type: string
 *                     example: 1990-01-01
 *                   phone:
 *                     type: string
 *                     example: 123456789
 */
router.post('/', patientsController.createPatient);
router.get('/', patientsController.getPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Busca paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: João
 *                 birthDate:
 *                   type: string
 *                   example: 1990-01-01
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *   put:
 *     summary: Atualiza paciente por ID
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
 *               name:
 *                 type: string
 *                 example: João Silva
 *               birthDate:
 *                 type: string
 *                 example: 1990-01-01
 *               phone:
 *                 type: string
 *                 example: 123456789
 *     responses:
 *       200:
 *         description: Paciente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: João Silva
 *                 birthDate:
 *                   type: string
 *                   example: 1990-01-01
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *   delete:
 *     summary: Remove paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Paciente removido
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 */
router.get('/:id', patientsController.getPatientById);
router.put('/:id', patientsController.updatePatient);
router.delete('/:id', patientsController.deletePatient);

module.exports = router;
