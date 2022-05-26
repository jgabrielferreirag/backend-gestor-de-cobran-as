const connection = require("../services/database/connection");

const registerClient = async (req, res) => {
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

  if (!name || !email || !cpf || !cellphone) {
    return res
      .status(404)
      .json("Os campos nome, email, CPF e telefone são obrigatórios");
  }

  try {
    const emailAlreadyUsed = await connection("clients")
      .where({ email })
      .first();
    if (emailAlreadyUsed) {
      return res.status(404).json("Este email ja está em uso");
    }

    const cpfAlreadyRegistered = await connection("clients")
      .where({ cpf })
      .first();

    if (cpfAlreadyRegistered) {
      return res.status(404).json("Este CPF já está cadastrado");
    }

    const clientRegistered = await connection("clients")
      .insert({
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
      return res.status(404).json("Não foi possivel cadastrar o cliente");
    }

    return res.status(200).json("Cliente registrado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerClient,
};
