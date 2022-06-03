const yup = require("yup");

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo seis caractéres")
    .required("É necessário informar a senha"),
  email: yup
    .string()
    .email("É necessário informar um e-mail válido")
    .required("É necessário informar um e-mail"),
});

module.exports = schema;
