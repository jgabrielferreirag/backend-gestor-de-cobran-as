const express = require("express");
const { signUpUser, editUser, getUserById } = require("./controllers/users");
const { login } = require("./controllers/login");
const { verifyLogin } = require("./middlewares/verifyLogin");
const {
  registerClient,
  listAllClients,
  getClientById,
  editClient,
} = require("./controllers/clients");
const { registerBill, listClientBills } = require("./controllers/bills");

const router = express();

router.post("/usuario", signUpUser);
router.post("/login", login);

router.use(verifyLogin);

router.put("/usuario", editUser);
router.get("/usuario", getUserById);
router.post("/cliente", registerClient);
router.get("/clientes", listAllClients);
router.get("/clientes/:clientId", getClientById);
router.put("/clientes/:clientId", editClient);
router.post("/clientes/:clientId/cobrancas", registerBill);
router.get("/clientes/:clientId/cobrancas", listClientBills);

module.exports = router;
