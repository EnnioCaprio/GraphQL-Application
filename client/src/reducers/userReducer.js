const userReducer = (state, action) => {
    switch(action.type){
        case 'ADD_USER':
            return[
                ...state,
                {
                    _id: action.id,
                    username: action.username,
                    email: action.email,
                    password: action.password
                }
            ]
        case 'DELETE_USER':
            return state.filter(user => user._id !== action._id)
        case 'UPDATE_USER':
            return state.map(user => user._id === action._id ? {...state, _id: action._id, username: action.username, email: action.email, password: action.password} : user)
        case 'PERSIST_DATA':
            return action.data
        default:
            return state;
    }
}

export { userReducer as default }