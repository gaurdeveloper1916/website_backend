const express = require("express");
const { registerUser, signIn, updatePassword, createDonation } = require("../controller/userController");
const { createOrder, verifyPayment } = require("../controller/paymentController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);
router.post('/updatepass', updatePassword)
router.post("/checkout", createOrder);
router.post("/payment-verify", verifyPayment);
router.post("/create-donation", createDonation);

module.exports = router;
