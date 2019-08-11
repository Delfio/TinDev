const express = require('express'); //Cria um novo servidor de requisição e resposta
const mongoose = require('mongoose');//Instanciando uma biblioteca de conexão que auxilia ao passar dados
const cors = require('cors');//Biblioteca que permite a integração do backend com o frontend

const routes = require('./routes');

const app = express(); //
const server = require('http').Server(app); //Junção de http com websocket(realtime) - ou seja funciona os dois
const io = require('socket.io')(
    server
);//Socket para realtime - websocket

const connectedUsers = {};

io.on('connection', socket => {
    const {user} = socket.handshake.query;
    connectedUsers[user] = socket.id
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


app.use(cors());
app.use(express.json());

//Conectando ao um cluster e criando um banco de dados - mongobd atlas 
//"o nome do banco = 'oministack8' - cria sozinho na hora de conectar, caso não existe"
mongoose.connect('mongodb+srv://oministack:sefode12@cluster0-y6min.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
//Vai apresentar um erro, tem que passar um novo formato de url - que é depois da ', {}'


//GET, POST, PUT, DELET
//BUSCA, CRIAR REGISTRO, EDITAR e DELETAR

//server.use(express.json); //Informando que todas as rotas serão padrão JSON

app.use(routes);

server.listen(3333);

//ARQUITETURA MVC - MODEL, VIEW, CONTROLLER