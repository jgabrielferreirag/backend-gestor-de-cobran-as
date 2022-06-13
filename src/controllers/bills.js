const connection = require("../services/database/connection");
const schemaRegisterBill = require("../validations/schemaRegisterBill");
const schemaEditBill = require("../validations/schemaEditBill");
const generateId = require("../utils/idGenerator");
const dateFormatting = require("../utils/dateFormatting");
const currencyFormatting = require("../utils/currencyFormatting");

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
      id = generateId();
    }

    const splitDate = due_date.split("/");
    const formattedDate =
      splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];

    const billRegistered = await connection("bills").insert({
      id,
      client_id: clientId,
      value,
      description,
      due_date: formattedDate,
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

const listClientBills = async (req, res) => {
  const { clientId } = req.params;
  try {
    const clientBills = await connection("bills")
      .where({
        client_id: clientId,
      })
      .select("id", "value", "due_date", "status", "description");

    return res.json(currencyFormatting(dateFormatting(clientBills)));
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listAllBills = async (req, res) => {
  try {
    const billsList = await connection("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select(
        "clients.name",
        "bills.id",
        "bills.value",
        "bills.due_date",
        "bills.status",
        "bills.description"
      );
    return res.json(currencyFormatting(dateFormatting(billsList)));
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteBill = async (req, res) => {
  const { billId } = req.params;
  try {
    const deletedBill = await connection("bills")
      .delete()
      .where({ id: billId })
      .andWhere({ status: "Pendente" })
      .andWhere("due_date", ">=", "NOW()")
      .returning("*");

    if (!deletedBill[0]) {
      return res.status(400).json("Não foi possivel deletar a cobrança");
    }

    return res.json("Cobrança excluída com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getBillById = async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await connection("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .where(" bills.id", "=", billId)
      .select(
        "clients.name",
        "bills.id",
        "bills.value",
        "bills.due_date",
        "bills.status",
        "bills.description"
      )
      .returning("*");
    if (!bill[0]) {
      return res.status(404).json("Cobrança inexistente");
    }
    return res.json(currencyFormatting(dateFormatting(bill))[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editBill = async (req, res) => {
  try {
    await schemaEditBill.validate(req.body);
    const { billId } = req.params;
    const { status, due_date, description, value } = req.body;
    const splitDate = due_date.split("/");
    const formattedDate =
      splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
    const editedBill = await connection("bills")
      .update({
        status,
        due_date: formattedDate,
        description,
        value,
      })
      .where({ id: billId });

    return res.json("Boleto atualizado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerBill,
  listClientBills,
  listAllBills,
  deleteBill,
  getBillById,
  editBill,
};
