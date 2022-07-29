const Usuario = require("../models/usuarioModels")
const {hashPassword} = require("../helpers/hashPassword")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const cadastrarUsuario = async (req, res) => {
   
    try {
       
        const {email, password} = req.body

        const novoUsuario = new Usuario({
            email,
            password
        })
       
        const passwordHashed = await hashPassword(novoUsuario.password, res)
        novoUsuario.password = passwordHashed
       
        const usuario = await Usuario.findOne({email: req.body.email})
        
        if(usuario){
            res.status(400).json({message: "Usuário já cadastrado no sistema"})
        }

        const salvarUsuario = await novoUsuario.save()
        
        res.status(201).json({
            message: "Cadastro efetuado com sucesso!",
            salvarUsuario

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

    const login = async (req, res) => {
        try {
            const {email, password} = req.body
            const usuario = await Usuario.findOne({email: email}).select("password")

        if(!usuario){
            return res.status(400).json({message: "Email ou senha incorreto"})
        }

        const checarPassword = await bcrypt.compare(password, usuario.password)

        if(!checarPassword) {
            return res.status(400).json({message: "Email ou senha incorreto"})
        }
        
        const SECRET = process.env.SECRET
        const token = jwt.sign({id: usuario._id, email: usuario.email}, SECRET)

        res.status(200).json({
            message: "Login efetuado com sucesso",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const listarUsuarios = async (req, res) => {
    
    try {
        const usuario = await Usuario.find()

        if(usuario.length == 0){
            return res.status(404).json({
                message: "Nenhum usuário encontrado"
            })
        }

        res.status(200).json({
            message: "Lista de usuários",
            usuario
        })
    } catch  (error) {
        res.status(500).json({
            message: error.message
        })
    }
}




module.exports = {
    cadastrarUsuario,
    login,
    listarUsuarios
}