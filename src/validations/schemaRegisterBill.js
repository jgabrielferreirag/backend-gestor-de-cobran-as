const yup = require("yup");

const schema = yup.object().shape({
  status: yup.string().required(),
  value: yup.number().required(),
  due_date: yup.string().required(),
  description: yup.string().required(),
});

module.exports = schema;
