//Boas praticas - o controller(do usuario) não deve ter mais doq os 5 metodos fundamentais
//INDEX - SHOW, STORE, UPDATE, DELETE
const Dev = require('../models/Dev');

module.exports= {
    //Criando (store) um novo Like
    //O id do likado vai vir atravez da url
    async store(req, res){
        console.log (req.io, req.connectedUsers);

        // Retornando quem foi que likado console.log(req.params.devId);
        // Retornando quem foi que deu o like console.log(req.headers.user);
        const { user } = req.headers;
        const { devId } = req.params;
        const loggedDev = await Dev.findById(user); //Guardar a instancia do usuario que deu like
        const targetDev = await Dev.findById(devId);//Guardar a instancia do usuario que foi likado

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists :(' });//BadRequest
        }

        if(targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id); //Puxando a informação e armazenando no array (mode/Dev)

        await loggedDev.save() //Metodo para realizar a alteração no BD

        return res.json(loggedDev);
    }
};