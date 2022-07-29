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
const usuarioRotas = require("./routes/usuarioRoutes")


app.use("/cadastro", dadosRotas)
app.use("/usuario", usuarioRotas)


module.exports = app