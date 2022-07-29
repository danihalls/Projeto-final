const mongoose = require("mongoose")

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Meu banco de dados está rodando")
    }catch (error){
        console.error(error)


    }
}

module.exports = {
    connect
}