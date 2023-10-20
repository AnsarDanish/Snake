import React, { Component } from 'react'
//import B from 'rea'

export default class CreateUser extends Component {

    initialState = {
        name: "",
        age: ""
    }

    state = this.initialState;
    
    formUser =(event)=>{
//  console.log(event);
   console.log(event.target.value);
        const {name , value} =event.target;
     
      //  console.log(Nname);
        this.setState({
            [name]:value
       })
       console.log(this.state);

    }

    afterSubmit=()=>{
       
        //console.log(this.props);
       this.props.addUser(this.state);
       this.setState(this.initialState);
    }

    render() {
        const { name, age } = this.state
        
        return (
            <div>
                <h1><b>Add User</b></h1><br></br>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input className='form-control' type='text' name='name' id='name' value={name} onChange={this.formUser}></input>
                </div>
                <div  className='form-group'>
                    <label htmlFor='age'>Age</label>
                    <input  className='form-control' type='text' name='age' id='age' value={age}  onChange={this.formUser}></input>
                </div>
                <div className='m-2'>
                    <button className='btn btn-primary' onClick={()=>{this.afterSubmit()}} >Submit</button>
                </div>
            </div>
        )
    }
}
