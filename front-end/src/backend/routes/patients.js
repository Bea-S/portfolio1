
/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Lista todos os pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Paciente criado
 *
 * /patients/{id}:
 *   get:
 *     summary: Busca paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 *   put:
 *     summary: Atualiza paciente por ID
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Paciente atualizado
 *       404:
 *         description: Paciente não encontrado
 *   delete:
 *     summary: Remove paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente removido
 *       404:
 *         description: Paciente não encontrado
 */
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAll);
router.post('/', patientController.create);
router.get('/:id', patientController.getById);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.delete);

module.exports = router;
