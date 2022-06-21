const yup = require("yup");

const schema = yup.object().shape({
  status: yup
    .string()
    .oneOf(["Pendente", "Paga"], "Status de cobrança inválido")
    .required("É necessário informar se o boleto foi pago ou não"),
  value: yup.number().required("É necessário informar o valor do boleto"),
  due_date: yup
    .string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "É necessário informar uma data de vencicmento válida"
    )
    .required("É necessário informar a data de vencimento do boleto"),
  description: yup
    .string()
    .required("É necessário informar o descritivo do boleto"),
});

module.exports = schema;
