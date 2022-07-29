const mongoose = require("mongoose")


const dadosSchema = new mongoose.Schema ({

    id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    datNasc: {
        type: Number
    },
    profissao: {
        type: String,
        required: true
    },
    modalidade: {
        type: String,
        required: true
    }


}, {timestamp: true})

const Dados = mongoose.model("dados", dadosSchema)

module.exports = Dados 
