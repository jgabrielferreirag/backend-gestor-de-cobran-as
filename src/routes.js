const express = require("express");
const { signUpUser, editUser } = require("./controllers/users");
const { login } = require("./controllers/login");
const { verifyLogin } = require("./middlewares/verifyLogin");
const { registerClient, listAllClients } = require("./controllers/clients");

const router = express();

router.post("/usuario", signUpUser);
router.post("/login", login);

router.use(verifyLogin);

router.put("/usuario", editUser);
router.post("/cliente", registerClient);
router.get("/clientes", listAllClients);

module.exports = router;
