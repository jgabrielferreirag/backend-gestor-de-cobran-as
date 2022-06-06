const connection = require("../services/database/connection");
const bcrypt = require("bcrypt");
const schemaSignUpUser = require("../validations/schemaSignUpUser");
const schemaEditUser = require("../validations/schemaEditUser");
const returnInitials = require("../utils/nameManipulation");

const signUpUser = async (req, res) => {
  try {
    await schemaSignUpUser.validate(req.body);

    const { name, email, password } = req.body;

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

    return res.status(200).json("Usuário cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    await schemaEditUser.validate(req.body);

    const { user } = req;
    const { name, email, cpf, password, cellphone } = req.body;

    if (email !== user.email) {
      const alreadyExists = await connection("users").where({ email }).first();
      if (alreadyExists) {
        return res.status(400).json("Email ja cadastrado");
      }
    }

    if (cpf !== user.cpf && cpf !== "") {
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
      .update({
        name,
        email,
        cpf: cpf ? cpf : null,
        password: hash,
        cellphone: cellphone ? cellphone : null,
      })
      .where({ id: user.id })
      .returning("*");

    if (!editedUser[0]) {
      return res.status(400).json("Não foi possivel editar dados do usuario");
    }

    const { firstName, initials } = returnInitials(editedUser[0].name);

    return res
      .status(200)
      .json({ message: "Usuario atualizado com sucesso", firstName, initials });
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
