const connection = require("../services/database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const returnInitials = require("../utils/nameManipulation");
const schemaLoginUser = require("../validations/schemaLoginUser");

const login = async (req, res) => {
  try {
    await schemaLoginUser.validate(req.body);

    const { email, password } = req.body;

    const userExists = await connection("users").where({ email }).first();

    if (!userExists) {
      return res.status(404).json("Email e/ou senha incorretos");
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(404).json("Email e/ou senha incorretos");
    }

    const { id, name } = userExists;
    const { firstName, initials } = returnInitials(name);

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    return res.status(200).json({ firstName, initials, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  login,
};
