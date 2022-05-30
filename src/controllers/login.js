const connection = require("../services/database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { returnInitials } = require("../utils/nameManipulation");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json("É necessário informar email e senha para acessar");
  }

  try {
    const userExists = await connection("users").where({ email }).first();
    if (!userExists) {
      return res.status(401).json("Email e/ou senha incorretos");
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(401).json("Email e/ou senha incorretos");
    }

    const { password: _, ...userData } = userExists;
    const { firstName, initials } = returnInitials(userData.name);

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "2hr",
    });

    return res.status(200).json({ userData, firstName, initials, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  login,
};
