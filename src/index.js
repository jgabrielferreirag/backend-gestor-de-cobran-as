require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const billScheduledJob = require("./services/cron/billScheduler");
const clientScheduledJob = require("./services/cron/clientScheduler");

const app = express();

billScheduledJob();
clientScheduledJob();

app.use(express.json());

app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 8000);
