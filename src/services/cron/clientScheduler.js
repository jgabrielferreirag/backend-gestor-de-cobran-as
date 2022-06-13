const cronJob = require("node-cron");
const connection = require("../database/connection");

const initScheduledJob = () => {
  const scheduledJob = cronJob.schedule(
    "0 19 * * *",
    async () => {
      const updateClients = await connection.raw(
        "update clients set client_status = 'Inadimplente' from bills where clients.id = bills.client_id and bills.status = 'Vencida'"
      );
    },
    { timezone: "Africa/Abidjan" }
  );
  scheduledJob.start();
};

module.exports = initScheduledJob;
