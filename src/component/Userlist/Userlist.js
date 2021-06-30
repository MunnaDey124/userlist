import React, { useEffect, useState } from 'react';
import './UserList.css';
// user data rendering
const renderData =data=>{
    return(
        <div className='row justify-content-center'>
            {data.map((users,index)=>{
                return <div className="col-md-3 mb-5">
                <div class="card text-center " style={{width: '18rem'}}>
                    <img src={users.avatar} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Name: {users.first_name} {users.last_name}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Email:{users.email}</li>
                        </ul>
                </div>
                </div>

            })}
        </div>
    )
};

const Userlist = () => {
    const [user,setUser]=useState([]);
    const [currentPage,setCurrentPage]=useState();
    const [itemPerPage,setItemPerPage]=useState(1);

// page handle
    const handleClick =(event)=>{
        console.log(Number(event.target.id));
        setCurrentPage(Number(event.target.id));
    }

    const pages =[];
    for(let i=1;i<=Math.ceil(user.length/itemPerPage);i++){
        pages.push(i);
    }
// item in perticular page
    const indexOfLastItem=currentPage *itemPerPage;
    const indexOfFirstItem=indexOfLastItem+itemPerPage;
    const currentItems =user.slice(indexOfLastItem,indexOfFirstItem);


    const renderPerPage =pages.map(number => {
        return (
            <li key={number} id={number} onClick={handleClick}>
                {number}

            </li>
        )
    });


    useEffect(()=>{
        fetch('https://reqres.in/api/users?page=2')
        .then(res=>res.json())
        .then(data=>{
            setUser(data.data);
        })
    },[]);
    return (
        <div className="container mt-3 pt-5  bg-danger">
           <ul className="page_decoration justify-content-center">{renderPerPage}</ul> 
            {renderData(currentItems)}
        </div>
    );
};

export default Userlist;