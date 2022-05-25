const connection = require("../services/database/connection");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).json("Todos os campos são obrigatórios");
  }

  try {
    const alreadyExists = await connection("users").where({ email }).first();

    if (alreadyExists) {
      return res.status(404).json("Este email já esta sendo utilizado");
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const registerUser = await connection("users").insert({
      name,
      email,
      password: hash,
    });

    return res.status(200).json("Usuario cadastrado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  const { user } = req;
  const { name, email, cpf, password, cellphone } = req.body;

  try {
    if (email && email !== user.email) {
      const alreadyExists = await connection("users").where({ email }).first();
      if (alreadyExists) {
        return res.status(404).json("Email ja cadastrado");
      }
    }

    if (cpf && cpf !== user.cpf) {
      const alreadyExists = await connection("users").where({ cpf }).first();
      if (alreadyExists) {
        return res.status(404).json("CPF ja cadastrado");
      }
    }

    let hash = undefined;

    if (password) {
      hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }

    const editedUser = await connection("users")
      .update({ name, email, cpf, password: hash, cellphone })
      .where({ id: user.id });

    return res.status(200).json("Usuario atualizado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  signUpUser,
  editUser,
};
