import React, { useState } from 'react'
import UserHeader from './UserHeader'
import UserBody from './UserBody'
import CreateUser from './CreateUser';

function UserContainer(props) {

  //  console.log(props.createUsre);//createUsre

    const [show , setShow]= useState(true);

    const setToggle=()=>{
      console.log(show);
        if(show) setShow(false)
        else  setShow(true);

    }


  return (
    <div  className='container'>
       
    <CreateUser  addUser={props.createUsre}/>
    <h1><b>User List</b></h1><br></br>
    <button className='btn btn-primary' onClick={()=>{ setToggle()}}>User Toggle</button>

     <div  className={show?"show":"hide"}>
     <UserHeader />  
     <UserBody   users={props.users}  rm={props.rm} />
     </div>

    

    </div>
  )
}

export default UserContainer