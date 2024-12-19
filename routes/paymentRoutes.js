const express = require("express");
const { createOrder, verifyPayment } = require("../controller/paymentController");

const router = express.Router();


router.post('/checkout', createOrder)
router.post('/payment-verify', verifyPayment)

module.exports = router;
