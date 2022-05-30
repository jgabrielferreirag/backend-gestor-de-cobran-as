const connection = require("../services/database/connection");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  if (!name || !email || !password || !repeatPassword) {
    return res.status(400).json("Todos os campos são obrigatórios");
  }

  if (password !== repeatPassword) {
    return res.status(400).json("As senhas não conferem");
  }

  try {
    const alreadyExists = await connection("users").where({ email }).first();

    if (alreadyExists) {
      return res.status(400).json("Este email já esta sendo utilizado");
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const registeredUser = await connection("users")
      .insert({
        name,
        email,
        password: hash,
      })
      .returning("*");

    if (!registeredUser[0]) {
      return res.status(400).json("Não foi possivel cadastrar o usuario");
    }

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
        return res.status(400).json("Email ja cadastrado");
      }
    }

    if (cpf && cpf !== user.cpf) {
      const alreadyExists = await connection("users").where({ cpf }).first();
      if (alreadyExists) {
        return res.status(400).json("CPF ja cadastrado");
      }
    }

    let hash = undefined;

    if (password) {
      hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }

    const editedUser = await connection("users")
      .update({ name, email, cpf, password: hash, cellphone })
      .where({ id: user.id })
      .returning("*");

    if (!editedUser[0]) {
      return res.status(400).json("Não foi possivel editar o usuario");
    }

    return res.status(200).json("Usuario atualizado com sucesso");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  const { user } = req;
  return res.json(user);
};

module.exports = {
  signUpUser,
  editUser,
  getUserById,
};
