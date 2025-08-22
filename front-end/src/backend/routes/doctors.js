
/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Lista todos os médicos
 *     responses:
 *       200:
 *         description: Lista de médicos
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
 *               specialty:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado
 *
 * /doctors/{id}:
 *   get:
 *     summary: Busca médico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 *   put:
 *     summary: Atualiza médico por ID
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
 *               specialty:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado
 *       404:
 *         description: Médico não encontrado
 *   delete:
 *     summary: Remove médico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico removido
 *       404:
 *         description: Médico não encontrado
 */
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAll);
router.post('/', doctorController.create);
router.get('/:id', doctorController.getById);
router.put('/:id', doctorController.update);
router.delete('/:id', doctorController.delete);

module.exports = router;
