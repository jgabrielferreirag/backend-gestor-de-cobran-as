const express = require("express");
const { signUpUser, editUser, getUserById } = require("./controllers/users");
const { login } = require("./controllers/login");
const { verifyLogin } = require("./middlewares/verifyLogin");
const {
  registerClient,
  listAllClients,
  getClientById,
} = require("./controllers/clients");

const router = express();

router.post("/usuario", signUpUser);
router.post("/login", login);

router.use(verifyLogin);

router.put("/usuario", editUser);
router.get("/usuario", getUserById);
router.post("/cliente", registerClient);
router.get("/clientes", listAllClients);
router.get("/clientes/:clientId", getClientById);

module.exports = router;
