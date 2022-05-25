const express = require("express");
const { signUpUser } = require("./controllers/users");

const router = express();

router.post("/usuarios", signUpUser)

module.exports = router;
