const connection = require("../services/database/connection");
const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const token = authorization.split(" ")[1];

    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const signedUser = await connection("users").where({ id }).first();

    if (!signedUser) {
      return res.status(401).json({
        message:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }
    const { password: _, ...userData } = signedUser;

    req.user = userData;

    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { verifyLogin };
