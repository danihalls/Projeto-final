const mongoose = require("mongoose")
const Dados = require("../models/dadosModels")


//crud

const cadastrarDado = async (req, res) => {
    try {
        const { nome, email, datNasc, profissao, modalidade } = req.body

        const novoDado = new Dados({
            nome,
            email,
            datNasc,
            profissao,
            modalidade

        })

        const dadosExiste = await Dados.findOne({ email: req.body.email })
        if (dadosExiste) {
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

const deletarDados = async (req, res) => {
    try {
        const usuario = await Dados.findById(req.params.id)

        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario não encontrado" })
        }

        await usuario.delete()
        res.status(200).json({ message: "Usuario deletado com sucesso" })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

const listarDados = async (req, res) => {
    try {
        const cadastrados = await Dados.find()
        res.status(200).json({
            message: "Lista de cadastrados",
            cadastrados

        })
        if(cadastrados.length == 0){
            return res.status(404).json({
                message: "Nenhum cadastro encontrado"
            })  
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const listarDadosPorId = async (req, res) => {
    try{
        const dadosId = await Dados.findById(req.params.id)

        if(!dadosId){
            return res.status(404).json({message: "Dado não encontrado"})
        }
        res.status(200).json({
            message: "Dados:" , 
            dadosId
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarDadosPorId = async (req, res) => {
    try {
        const {nome, email, profissao, modalidade} = req.body
        const dados = await Dados.findById(req.params.id)

        if(!dados) {
            return res.status(404).json({message: "Dado não encontrado"})
        }

        dados.nome = nome || dados.nome
        dados.email = email || dados.email
        dados.profissao = profissao || dados.profissao
        dados.modalidade = modalidade || dados.modalidade

        const dadosAtualizados = await dados.save()

        res.status(200).json({
            message: "Cadastro atualizado com sucesso",
            dadosAtualizados
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    cadastrarDado,
    deletarDados,
    listarDados,
    listarDadosPorId,
    atualizarDadosPorId

}