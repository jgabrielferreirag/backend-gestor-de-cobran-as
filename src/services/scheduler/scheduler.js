//função para atualizar o status do boleto e do cliente e
//rodar no agendamento do Heroku Scheduler todo dia as 8 da manha

const connection = require("../database/connection");

const initScheduledJob = async () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const bills = await connection("bills")
    .where({ status: "Pendente" })
    .select("id", "due_date");
  const expiredBills = bills.filter((bill) => {
    return ++bill.due_date < today;
  });

  const billsToChange = expiredBills.map((bill) => {
    return bill.id;
  });

  const updatedBillStatus = await connection("bills")
    .update({ status: "Vencida" })
    .whereIn("id", billsToChange);

  const updateClients = await connection.raw(
    "update clients set client_status = 'Inadimplente' from bills where clients.id = bills.client_id and bills.status = 'Vencida'"
  );
};

initScheduledJob();
