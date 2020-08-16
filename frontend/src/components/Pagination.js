import React, {useState} from 'react';

const Pagination = (props) => {
    

    const [current, setCurrent] = useState(false);

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalUsers / props.usersPerPage); i++){
        pageNumbers.push(i)
    }

    return(

        <div className="container-button">   
            {
                pageNumbers.map(page => (
                    <button key={page} onClick={() => {
                        setCurrent(!current)
                        props.paginate(page)
                    }} className="container-buttons-single-button">{page}</button>
                ))
            } 
        </div>

    )
}

export { Pagination as default }