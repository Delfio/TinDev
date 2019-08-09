import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    createSwitchNavigator({ //Cria navegação entre duas telas sem animação
        Login,
        Main,
    })
);
