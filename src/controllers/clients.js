const connection = require("../services/database/connection");
const schemaEditClient = require("../validations/schemaEditClient");
const schemaRegisterClient = require("../validations/SchemaRegisterClient");
const formatCellphone = require("../utils/cellphoneFormatting");
const generateId = require("../utils/idGenerator");

const registerClient = async (req, res) => {
  try {
    await schemaRegisterClient.validate(req.body);
    const {
      name,
      email,
      cpf,
      cellphone,
      address,
      complement,
      postal_code,
      district,
      city,
      state,
    } = req.body;

    const emailAlreadyUsed = await connection("clients")
      .where({ email })
      .first();
    if (emailAlreadyUsed) {
      return res.status(400).json("Este email ja está em uso");
    }

    const cpfAlreadyRegistered = await connection("clients")
      .where({ cpf })
      .first();

    if (cpfAlreadyRegistered) {
      return res.status(400).json("Este CPF já está cadastrado");
    }

    let id = generateId();
    while (true) {
      const repeatedId = await connection("clients").where({ id }).first();
      if (!repeatedId) {
        break;
      }
      id = generateId();
    }

    const clientRegistered = await connection("clients")
      .insert({
        id,
        name,
        email,
        cpf,
        cellphone,
        address,
        complement,
        postal_code,
        district,
        city,
        state,
      })
      .returning("*");

    if (!clientRegistered[0]) {
      return res.status(400).json("Não foi possivel cadastrar o cliente");
    }

    return res.status(200).json("Cliente registrado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listAllClients = async (req, res) => {
  try {
    const clientsList = await connection("clients")
      .select("id", "name", "cpf", "email", "cellphone", "client_status")
      .returning("*");

    return res.status(200).json(clientsList);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getClientById = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await connection("clients").where({ id: clientId }).first();

    if (!client) {
      return res.status(404).json(`Cliente com ID ${clientId} inexistente`);
    }

    const formattedCellphone = formatCellphone(client.cellphone);
    client.cellphone = formattedCellphone;
    return res.json(client);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientExists = await connection("clients")
      .where({ id: clientId })
      .first();

    if (!clientExists) {
      return res.status(404).json(`O cliente com ID ${clientId} não existe`);
    }

    await schemaEditClient.validate(req.body);

    const {
      name,
      email,
      cpf,
      cellphone,
      address,
      complement,
      postal_code,
      district,
      city,
      state,
    } = req.body;

    const alreadyExists = await connection("clients")
      .where({ email })
      .orWhere({ cpf })
      .first();

    if (alreadyExists && alreadyExists.id !== parseInt(clientId)) {
      return res
        .status(401)
        .json("Ja existe um cliente cadastrado com esses dados");
    }

    const clientUpdated = await connection("clients")
      .update({
        name,
        email,
        cpf,
        cellphone,
        address: address ? address : null,
        complement: complement ? complement : null,
        postal_code: postal_code ? postal_code : null,
        district: district ? district : null,
        city: city ? city : null,
        state: state ? state : null,
      })
      .where({ id: clientId })
      .returning("*");

    if (!clientUpdated) {
      return res
        .status(400)
        .json("Não foi possivel atualizar os dados do cliente");
    }

    return res.json("Cliente atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerClient,
  listAllClients,
  getClientById,
  editClient,
};
