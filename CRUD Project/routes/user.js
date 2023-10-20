const express = require("express");
const router = express.Router();
const { signUp, signIn, current } = require("../controllers/user");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/signup", signUp);

router.post("/login", signIn);

router.get("/current",validateToken, current)


module.exports = router;