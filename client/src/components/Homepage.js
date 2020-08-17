import React, {useState, useReducer, useEffect, useContext} from 'react';
import { ModelAContext } from '../context/ModelAContext';
import Header from './Header';
import Users from './Users';
import userReducer from '../reducers/userReducer';
import Model from './Model';
import Pagination from './Pagination';

const Homepage = () => {

    const [usersPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingData, setLoadingData] = useState(true);
    const [form, setForm] = useState(undefined);
    const [users , dispatch] = useReducer(userReducer, []);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {m, d} = useContext(ModelAContext);
    const [error, setError] = useState(undefined);

    const [model, setModel] = m

    const MAIN_URL = window.location.origin;

    if(MAIN_URL.includes(3)){
        MAIN_URL.replace(3, 5)
    }

    const URL = `${MAIN_URL}/graphql`;

    useEffect(() => {
        const gettingUsers = {
            query: `
                query{
                    users{
                        _id,
                        username,
                        email,
                        password
                    }
                }
            `
        };

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(gettingUsers),
            headers: {
                "Content-Type": "application/json"
            }      
        })
        .then((res) => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed')
            }
            setTimeout(() => {
                setLoadingData(!loadingData);
            }, 1000)
            return res.json();
        })
        .then(res => {
            dispatch({
                type: 'PERSIST_DATA',
                data: res.data.users
            })
        })
        .catch((err) => console.log(err))
    }, [])

    const addUser = (e) => {
        e.preventDefault();

        const user = users.map(user => user.username);
        
        const addUser = {
            query: `
                mutation{
                    createUser(inputUser: {username: "${username}", email:"${email}", password:"${password}"}){
                        _id,
                        username,
                        email,
                        password
                    }
                }
                `
        }

        if((username && email && password) && user.indexOf(username.toLowerCase()) === -1){
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify(addUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'ADD_USER',
                    id: res.data.createUser._id,
                    username: res.data.createUser.username,
                    email: res.data.createUser.email,
                    password: res.data.createUser.password
                })
            })
            .catch(e => {
                console.log(e)
            })
        }else{
            setError('Error, user already exists or field/s missing')
        }

        setTimeout(() => {
            setError('');
        }, 3500)

        setUsername('');
        setEmail('');
        setPassword('');
    }

    const deleteUser = (id) => {
        console.log(id);
        const deleteUser = {
            query: `
                mutation{
                    deleteUser(_id: "${id}"){
                        _id
                    }
                }
            `
        }

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(deleteUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            dispatch({
                type: 'DELETE_USER',
                _id: res.data.deleteUser._id
            })
        })
        .catch(err => console.log(err))
    }

    const updateUser = (id, username, email, password) => {

        const updateUser = {
            query: `
                mutation{
                    updateUser(updateUser: {_id: "${id}", username: "${username}", email: "${email}", password: "${password}"}){
                    _id,
                    username,
                    email,
                    password
                    }
                }
            `
        }

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(updateUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: 'UPDATE_USER',
                _id: res.data.updateUser._id,
                username: res.data.updateUser.username,
                email: res.data.updateUser.email,
                password: res.data.updateUser.password
            })
            setError('');
            console.log(res)
        })
        .catch(err => console.log(err))
        setModel(!model);
    }

    const calculateNumberUsers = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        return currentUsers
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className="container" style={model ? {overflow: 'hidden'} : {}}>
            <div className="container-homepage">
                <div className="container-header">
                    <Header />
                    <div className="container-form__open">
                        <span className="container-form__open__button" onClick={() => {
                            setForm(!form);
                        }}>{form ? 'x' : '+'}</span>
                    </div>
                    <h3>{error}</h3>
                    <div className={form ? "container-form__add" : "container-form__add__hide"}>
                        <form onSubmit={addUser}>
                            <div className="container-form__add__input">
                                <input type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
                            </div>
                            <div className="container-form__add__input">
                                <input type="text" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="email"/> 
                            </div>
                            <div className="container-form__add__input">
                                <input type="text" value={password || ''} onChange={(e) => setPassword(e.target.value)} placeholder="password"/> 
                            </div>
                            <div className="container-form__button">
                                <button>Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={model ? 'overlay' : ''}>
                    {
                        model === true ? 
                        <Model
                            updateUser={updateUser}
                        /> 
                        : 
                        ''
                    }
                </div>
                <div className="container-users">
                    {
                        loadingData ? 
                        <div className="container-users-loading"></div>
                            :
                        calculateNumberUsers().map((user, i) => (
                            <Users 
                                key={user._id}
                                text={user}
                                delete={deleteUser}
                            />
                        ))
                    }
                </div>
                <Pagination 
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}


export { Homepage as default }