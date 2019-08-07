//repassando o server
const express = require('express');
const DevController = require('./Controllers/DevController');
const LikeController = require('./Controllers/LikeController');
const DislikeController = require('./Controllers/DislikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs',DevController.store);
routes.post('/devs/:devId/likes', LikeController.store); //Pegando o id através da URL
routes.post('/devs/:devId/dislikes', DislikeController.store);

//Expor uma informação -- return
module.exports = routes;
/*
routes.get('/', (req, res) =>{
    //Chamada de rota é sempre o metodo get
        //Sintaxe Jason - objeto ou vetor
        return res.send({message: `Olá! ${req.query.name}`});
});
*/

/*
//O navegador acessa sempre o metodo GET, para acessar o post tem que ter formulario
routes.post('/devs', (req, res)=> {
    //req.body - pega as informações criadas pelo insominia(app envia formularios) - json
    //console.log(req.body) = mostra no terminal

    return res.json( req.body );//Envia de volta para a requisição - insominia
});
*/