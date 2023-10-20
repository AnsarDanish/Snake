import React, { Component } from 'react'
import UserContainer from './UserContainer'

export default class 
 extends Component {
    state={
        userData:[
            {
            name:"Danish",
            age:25
            },
            {
            name:"Hazim",
            age:20
            },
            {
            name:"Asim",
            age:16
            },
            
        ],
        isDeleted:false
    }

  // removeUser =()
  addUser=(user)=>{
    this.setState({userData : [...this.state.userData, user]});
  }

  render() {

   const removeUser =(index)=>{
  
      const afterRemove=  this.state.userData.filter((value , i)=>{
         
        return  i!=index;
      })
     this.setState({userData:afterRemove});
      
    }
 
    return (
      <div>
            <UserContainer  createUsre={this.addUser}  users={this.state.userData}  rm={removeUser}/>
      </div>
    )
  }
}
