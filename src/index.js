require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const billScheduledJob = require("./services/scheduler/billScheduler");
const clientScheduledJob = require("./services/scheduler/clientScheduler");

const app = express();

billScheduledJob();
clientScheduledJob();

app.use(express.json());

app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 8000);
