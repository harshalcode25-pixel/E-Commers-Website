const express = require("express");
const { register, signin, getUserProfile } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { validateRegister, validateSignin } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/signin", validateSignin, signin); 
router.get("/profile", isAuth, getUserProfile);


module.exports = router;
