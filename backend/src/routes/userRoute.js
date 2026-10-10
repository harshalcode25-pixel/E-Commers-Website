const express = require("express");
const { register, signin, getUserProfile } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin); 
router.get("/profile", isAuth, getUserProfile);


module.exports = router;
