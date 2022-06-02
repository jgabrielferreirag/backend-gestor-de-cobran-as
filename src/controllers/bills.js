const connection = require("../services/database/connection");
const schemaRegisterBill = require("../validations/schemaRegisterBill");
const generateId = require("../utils/billIdGenerator");

const registerBill = async (req, res) => {
  const { clientId } = req.params;
  try {
    await schemaRegisterBill.validate(req.body);
    const { value, description, due_date, status } = req.body;
    let id = generateId();
    while (true) {
      const repeatedId = await connection("bills").where({ id }).first();
      if (!repeatedId) {
        break;
      }
    }
    const billRegistered = await connection("bills").insert({
      id,
      client_id: clientId,
      value,
      description,
      due_date,
      status,
    });

    if (!billRegistered) {
      return res.status(400).json("Não foi possivel cadastrar cobrança");
    }

    return res.json("Cobrança cadastrada com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { registerBill };
