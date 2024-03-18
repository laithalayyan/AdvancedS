const express = require('express');
const paymentController = require('./paymentController');
const router = express.Router();

router.post('/', paymentController.createPayment);
router.get('/', paymentController.getPayments);
router.get('/:userId', paymentController.getPaymentsByUserId);
router.get('/project/:projectId', paymentController.getPaymentsByProjectId);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
