// dependecias
const express = require('express')

// preciso da controller
const controller = require('../controllers/dadosControllers')

// nossas rotas
const router = express.Router()

//criar
router.post("/create", controller.cadastrarDado)

//deletar
router.delete("/delete/:id", controller.deletarDados)

//listar
router.get("/list", controller.listarDados)

//listar por id
router.get("/list/:id", controller.listarDadosPorId)

//atualizar por id
router.put("/update/:id", controller.atualizarDadosPorId)



module.exports = router