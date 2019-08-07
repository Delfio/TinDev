const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req,res){
        //console.log(req.body.username); retornar o nome 
        const { username } = req.body;

        const userExists = await Dev.findOne({
            user: username
        });

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