const yup = require("yup");

const schema = yup.object().shape({
  cellphone: yup.string().matches(/^(|.{11,11})$/, {
    excludeEmptyString: true,
    message: "O celular deve ter onze caractéres",
  }),
  cpf: yup.string().matches(/^(|.{11,11})$/, {
    excludeEmptyString: true,
    message: "O CPF deve ter onze caractéres",
  }),
  repeatPassword: yup
    .string()
    .required("É necessário repetir a senha")
    .test("Confere", "As senhas não conferem", function (repeatPassword) {
      return repeatPassword === this.parent.password;
    }),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo seis caractéres")
    .required("O campo senha é obrigatório"),
  email: yup
    .string()
    .email("O email deve ser válido")
    .required("O campo email é obrigatório"),
  name: yup.string().required("O campo nome é obrigatório"),
});

module.exports = schema;
