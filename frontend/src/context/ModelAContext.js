import React, {useState, createContext} from 'react';
export const ModelAContext = createContext();

export const ModelAProvider = (props) => {

    const [model, setModel] = useState(undefined);
    const [data, setData] = useState('');

    return(
        <ModelAContext.Provider value={{ m: [model, setModel], d: [data, setData]}}>
            {props.children}
        </ModelAContext.Provider>
    )
}