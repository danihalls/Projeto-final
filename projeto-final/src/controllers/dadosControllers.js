const mongoose = require("mongoose")
const Dados = require("../models/dadosModels")


//crud

const cadastrarDado = async (req, res) => {
    try {
        const {nome, email, datNasc, profissao,  modalidade } = req.body

        const novoDado = new Dados({
            nome, 
            email,
            datNasc, 
            profissao, 
            modalidade    

        })
       
        const dadosExiste = await Dados.findOne({email: req.body.email})
        if(dadosExiste){
            return res.status(400).json({
                error: "Email já cadastrado"
            })
        }

    const salvarDados = await novoDado.save()
    res.status(201).json({
        message: "Cadastro realizado com sucesso!",
        salvarDados
    })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {
    cadastrarDado
}