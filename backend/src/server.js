const express = require('express'); //Cria um novo servidor de requisição e resposta
const mongoose = require('mongoose');//Instanciando uma biblioteca de conexão que auxilia ao passar dados
const cors = require('cors');//Biblioteca que permite a integração do backend com o frontend

const routes = require('./routes');

const server = express(); //

server.use(cors());
server.use(express.json());

//Conectando ao um cluster e criando um banco de dados - mongobd atlas 
//"o nome do banco = 'oministack8' - cria sozinho na hora de conectar, caso não existe"
mongoose.connect('mongodb+srv://oministack:sefode12@cluster0-y6min.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
//Vai apresentar um erro, tem que passar um novo formato de url - que é depois da ', {}'


//GET, POST, PUT, DELET
//BUSCA, CRIAR REGISTRO, EDITAR e DELETAR

//server.use(express.json); //Informando que todas as rotas serão padrão JSON

server.use(routes);

server.listen(3333);

//ARQUITETURA MVC - MODEL, VIEW, CONTROLLER