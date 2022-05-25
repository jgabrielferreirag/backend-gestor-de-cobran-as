require("dotenv").config();
const express = require("express");
const cors = requrie("cors");
const app = express()


app.use(express.json())
app.use(cors())