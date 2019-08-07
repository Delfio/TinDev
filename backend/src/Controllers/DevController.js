const axios = require('axios');
const Dev = require('../models/Dev');

//Boas praticas - o controller(do usuario) não deve ter mais doq os 5 metodos fundamentais
//INDEX - SHOW, STORE, UPDATE, DELETE

module.exports = {
    //Listagem de usuarios tirando os que deram dislikes
    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and:[ //Aplicar 3 filtros de uma vez
                { _id: {$ne: user } },
                { _id: {$nin: loggedDev.likes } },
                { _id: {$nin: loggedDev.dislikes } }
            ],
        });
        return res.json(users);
    },

    //Rota de cadastro
    async store(req,res){
        //console.log(req.body.username); retornar o nome 
        const { username } = req.body;

        //Criar uma constante para procurar um usuario que já existe no banco de  dados
        const userExists = await Dev.findOne({
            user: username
        });

        //Caso esse usuario exista interrompa o processo e retorne a infos dele automaticamente!
        if(userExists){
            return res.json(userExists);
        };

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const {name, bio, avatar_url} = response.data; // Pegando a informação em json e passando pra função do model
       
        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar_url
        })
        return res.json(dev);
    }
};