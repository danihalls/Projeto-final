require("dotenv-safe").config()

// importar as dependencias
const express = require('express');
const cors = require('cors')
const db = require("./database/mongoConfig")

// criar a api
const app = express();
db.connect()

// configurar a api
app.use(express.json())
app.use(cors())

const dadosRotas = require("./routes/dadosRotas")

app.use("/cadastro", dadosRotas)
module.exports = app