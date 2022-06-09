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
const {
  registerBill,
  listClientBills,
  listAllBills,
  deleteBill,
  getBillById,
} = require("./controllers/bills");

const router = express();

router.get("/", async (req, res) => {
  return res.status(200).json("API Backend Bug as a Service");
});

router.post("/usuario", signUpUser); //cadastrar usuario
router.post("/login", login); //logar usuario

router.use(verifyLogin); //middleware de verificação de autenticação

router.put("/usuario", editUser); //editar usuario
router.get("/usuario", getUserById); //listar dados do usuario

router.post("/cliente", registerClient); //cadastrar cliente
router.get("/clientes", listAllClients); //listar todos os clientes
router.get("/clientes/:clientId", getClientById); //listar dados de cliente especifico pelo ID
router.put("/clientes/:clientId", editClient); //editar dados de cliente especifico pelo ID
router.post("/clientes/:clientId/cobrancas", registerBill); //cadastrar cobrança
router.get("/clientes/:clientId/cobrancas", listClientBills); //listar todas as cobranças de um cliente especifico

router.get("/cobrancas", listAllBills); //listar todas as cobranças da empresa
router.delete("/cobrancas/:billId", deleteBill);
router.get("/cobrancas/:billId", getBillById);

module.exports = router;
