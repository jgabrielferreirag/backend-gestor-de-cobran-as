const yup = require("yup");

const schema = yup.object().shape({
  address: yup.string(),
  complement: yup.string(),
  postal_code: yup.string().min(8),
  district: yup.string(),
  city: yup.string(),
  state: yup.string().min(2),
  cellphone: yup.string().required("O campo celular é obrigatório"),
  cpf: yup.string().min(11).required("O campo CPF é obrigatório"),
  email: yup
    .string()
    .email("Informar um e-mail válido")
    .required("O campo e-mail é obrigatório"),
  name: yup.string().required("O campo nome é obrigatório"),
});

module.exports = schema;
