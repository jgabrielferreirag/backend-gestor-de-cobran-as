const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFile = ["./src/routes.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "CFinanças",
    description:
      "Documentação gerada pelo swagger-autogen para o Backend da aplicação web CFinanças",
  },
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Usuarios", description: "Endpoints" },
    { name: "Clientes", description: "Endpoints" },
    { name: "Login", description: "Endpoints" },
    { name: "Cobranças", description: "Endpoints" },
  ],
  definitions: {
    Usuarios: {
      $name: "Marcela",
      $email: "marcela@gmail.com",
      $password: "213256",
      repeatPassword: "213256",
      cpf: "12345678910",
      cellphone: "12345678910",
    },
    Clientes: {
      $name: "Marcela",
      $cpf: "12345678100",
      $email: "marcela@gmail.com",
      $cellphone: "11111111111",
      address: "Rua X",
      postal_code: "12345678",
      state: "RJ",
      city: "Rio de Janeiro",
      district: "Ipanema",
      complement: "6",
    },
    Cobranças: {
      $description: "Emprestimo",
      $due_date: "10/06/2022",
      $value: 230.0,
      status: "Pendente",
    },
  },
};

swaggerAutogen(outputFile, endpointsFile, doc);
