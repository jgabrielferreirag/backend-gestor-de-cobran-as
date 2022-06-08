const cronJob = require("node-cron");
const connection = require("../database/connection");

const initScheduledJob = () => {
  const scheduledJob = cronJob.schedule(
    "42 17 * * *",
    async () => {
      const today = new Date().setHours(0, 0, 0, 0);
      const updateBillStatus = await connection("bills")
        .update({ status: "Vencida" })
        .where({ status: "Pendente" })
        .andWhere("due_date", "<", today);
    },
    { timezone: "America/Sao_Paulo" }
  );

  scheduledJob.start();
};

module.exports = initScheduledJob;
