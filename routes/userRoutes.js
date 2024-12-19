const express = require("express");
const { registerUser, signIn, updatePassword } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);
router.post('/updatepass', updatePassword)


module.exports = router;
