// routes/customerRoutes.js
const express = require('express');
const customerController = require('../customerController');

const router = express.Router();

router.get('/', customerController.getCustomers);
router.post('/', customerController.createCustomer);
router.put('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

module.exports = router;
