//Regra de negocio para o usuario DEV
const{ Schema, model }= require('mongoose');

//parametros para o banco de dados
// Link api publica github https://api.github.com/users/Delfio
const DevSchema = new Schema({
    //Pegar as infos do gitHub
    //Os tipos "String" são os endereços da API que retorna os dados expecificos 'url'
    name:{
        type: String,
        required: true,
    },

    user:{
        type: String,
        required: true,
    },
    bio: String,
    avatar:{
        type: String,
        required: true,
    }
}, {
    timestamps: true, // Cria de forma automatica "createdAT, updateAt"
    //createdAT - armazenar de forma automatica a criação de um registro no banco de dados
    //updateAt - armazenar ///// a data da ultima alteração do registro
});

module.exports = model('Dev', DevSchema); //retornando os dados