const express = require("express");
const { signUpUser } = require("./controllers/users");
const { login } = require("./controllers/login");

const router = express();

router.post("/usuarios", signUpUser);
router.post("/login", login);

module.exports = router;
