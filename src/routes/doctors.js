/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Cria um novo médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dra. Ana
 *               specialty:
 *                 type: string
 *                 example: Cardiologia
 *               phone:
 *                 type: string
 *                 example: 987654321
 *     responses:
 *       201:
 *         description: Médico criado
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
 *                   example: Dra. Ana
 *                 specialty:
 *                   type: string
 *                   example: Cardiologia
 *                 phone:
 *                   type: string
 *                   example: 987654321
 *   get:
 *     summary: Lista todos os médicos
 *     responses:
 *       200:
 *         description: Lista de médicos
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
 *                     example: Dra. Ana
 *                   specialty:
 *                     type: string
 *                     example: Cardiologia
 *                   phone:
 *                     type: string
 *                     example: 987654321
 */
/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Busca médico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Médico encontrado
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
 *                   example: Dra. Ana
 *                 specialty:
 *                   type: string
 *                   example: Cardiologia
 *                 phone:
 *                   type: string
 *                   example: 987654321
 *       404:
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Médico não encontrado
 *   put:
 *     summary: Atualiza médico por ID
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
 *                 example: Dra. Ana Paula
 *               specialty:
 *                 type: string
 *                 example: Cardiologia
 *               phone:
 *                 type: string
 *                 example: 987654321
 *     responses:
 *       200:
 *         description: Médico atualizado
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
 *                   example: Dra. Ana Paula
 *                 specialty:
 *                   type: string
 *                   example: Cardiologia
 *                 phone:
 *                   type: string
 *                   example: 987654321
 *       404:
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Médico não encontrado
 *   delete:
 *     summary: Remove médico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Médico removido
 *       404:
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Médico não encontrado
 */
const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');

router.post('/', doctorsController.createDoctor);
router.get('/', doctorsController.getDoctors);
router.get('/:id', doctorsController.getDoctorById);
router.put('/:id', doctorsController.updateDoctor);
router.delete('/:id', doctorsController.deleteDoctor);

module.exports = router;
