import React, {useContext, useReducer} from 'react';
import userReducer from '../reducers/userReducer';
import { ModelAContext } from '../context/ModelAContext';

const Model = (props) => {

    const URL = 'http://localhost:5000/graphql';

    const {m, d} = useContext(ModelAContext);

    const [data, setData] = d;

    const [model, setModel] = m;

    const [users, dispatch] = useReducer(userReducer, []);

    const updateSetting = () => {
        const id = data;
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        props.updateUser(id, username, email, password);
    }

    return(
        <div className="model-structure">
            <div className="model-structure-header">
                <h1>Model update</h1>
                <button onClick={() => setModel(!model)}>X</button>
            </div>
            <div className="model-structure-inputs">
                <input type="text" id="username" placeholder="username"/><br />
                <input type="text" id="email" placeholder="email"/><br />
                <input type="text" id="password" placeholder="password"/><br />
                <button onClick={updateSetting}>Update</button>
            </div>
        </div>
    )
}   

export { Model as default }