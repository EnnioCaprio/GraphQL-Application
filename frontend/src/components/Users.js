import React, {Fragment, useContext, useState} from 'react';
import { ModelAContext } from '../context/ModelAContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Users = (props) => {
    const {m, d} = useContext(ModelAContext);
    const [model, setModel] = m
    const [data, setData] = d

    const [follow, setFollow] = useState(false)
    
    return(
        <Fragment>
            <div className="container-users-user">
                <div className="container-users-user-profile">
                    <button className="container-users-user-delete" onClick={() => {
                        props.delete(props.text._id)
                    }}>X</button>
                    <button className="container-users-user-update" onClick={() => {
                            setModel(!model)
                            setData(props.text._id)
                    }}>Update</button>
                    <div className="container-users-user-following">
                        <div className="container-users-user-following-one">
                            <div className="container-users-user-background">
                                <FontAwesomeIcon icon={faUser} color="black" size="2x" className="container-users-user-icon"/>    
                            </div>
                        </div>
                        <div className="container-users-user-following-two">
                            <div className="container-users-user-desc">
                                <h4>{props.text.username}</h4>
                            </div>
                            <div className="container-users-user-buttons">
                                <button onClick={() => setFollow(!follow)}>{!follow ? "Follow" : "Don't follow"}</button>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-users-user-info"> 
                    <div>
                        <p>Followers</p>
                    </div>
                    <div>
                        <p>Following</p>
                    </div>
                    <div>
                        <p>Posts</p>
                    </div>
                </div>
                <div className="container-users-user-content">
                    <div>
                        <h4>See Followers</h4>
                        <i>{">>"}</i>
                    </div>
                    <div>
                        <h4>See Following</h4>
                        <i>{">>"}</i>
                    </div>
                    <div>
                        <h4>See Description</h4>
                        <i>{">>"}</i>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export { Users as default }