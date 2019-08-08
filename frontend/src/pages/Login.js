import React, {useState} from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';


export default function Loguin({ history }){ //pegar a navegação depois do /
    const [username, setUsername] = useState('');//Capturar o valor da variavel padrão vazio '' "ISSO É UM ESTADO"

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username, //short sintaxe username = usarname;
        });

        const{ _id } = response.data;

        history.push(`/dev/${_id}`);//Redirecionamento  e jogando o id para a rota
    }

    return(
        <div className= "login-container">
            <form onSubmit={handleSubmit}>
                <img src= {logo} alt='Tindev' />
                <input 
                placeholder="Digite seu usuario no GitHub" 
                value={username}
                onChange={e => setUsername(e.target.value)} //passar a informação para a variavél
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}// O estado de um coponente é todo e qualquer informação que o componente vai manipular
//Utiliza-se estado para capturar informações do html para o react "input"