import React, { useState } from 'react'

function UserBody(props) {

   // console.log(props);

    const removeUser=props.rm;
 //   console.log(props.rm);

    const allUsers =props.users.map((value , index) => {

            const {name ,age}=value;
           // console.log(name,age);
            return (

                <div  key={index} className='row border-bottom border-secondary p-2' >
                    <div className='col'> {name}

                    </div>
                    <div className='col'> {age}

                    </div>
                    <div className='col'> <button className='btn btn-danger' onClick={()=>{removeUser(index)}} >Delete</button>

                    </div>
                </div>

            )
        })
    
    return (
        <div>
            {allUsers}
        </div>
    )
}

export default UserBody