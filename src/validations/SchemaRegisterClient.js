const yup = require("yup");

const schema = yup.object().shape({
  address: yup.string(),
  complement: yup.string(),
  postal_code: yup.string().matches(/^(|.{8,8})$/, {
    excludeEmptyString: true,
    message: "O código postal deve ter oito caractéres",
  }),
  district: yup.string(),
  city: yup.string(),
  state: yup.string().matches(/^(|.{2,2})$/, {
    excludeEmptyString: true,
    message: "O estado deve ter dois caractéres",
  }),
  cellphone: yup
    .string()
    .required("O campo celular é obrigatório")
    .matches(/^(|.{11,11})$/, {
      excludeEmptyString: true,
      message: "O celular deve ter onze caractéres",
    }),
  cpf: yup
    .string()
    .matches(/^(|.{11,11})$/, {
      excludeEmptyString: true,
      message: "O CPF deve ter onze caractéres",
    })
    .required("O campo CPF é obrigatório"),
  email: yup
    .string()
    .email("Informar um e-mail válido")
    .required("O campo e-mail é obrigatório"),
  name: yup.string().required("O campo nome é obrigatório"),
});

module.exports = schema;
