const cronJob = require("node-cron");
const connection = require("../database/connection");

const initScheduledJob = () => {
  const scheduledJob = cronJob.schedule("* 17 * * *", async () => {
    console.log("Tarefa finalizada");
    const today = new Date().setHours(0, 0, 0, 0);
    console.log(today.toISOString());
    const updatedBillStatus = await connection("bills")
      .update({ status: "Vencida" })
      .where({ status: "Pendente" })
      .andWhere("due_date", "<", today.toISOString())
      .returning("*");
    console.log(updatedBillStatus);
  });
  scheduledJob.start();
};

module.exports = initScheduledJob;
