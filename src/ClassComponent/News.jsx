import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class 
  extends Component {
    constructor(){
        super();
        console.log("Hello I am a Constructor");
    }
     
    art=[];
    state ={
        articles:[]
    }
  async  componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=513d8d13bc3c4f109fd7749f059f2f22";
        let data= await fetch(url);
        let ParseData = await data.json();
        this.art=ParseData.articles;
        this.setState({articles:ParseData.articles});


    }
  render() {
    return (
    
        <div className='container my-3'>
        <h2>New Monkey - Top HeadLine</h2>
         <div className='row'>
            {this.state.articles.map((ele)=>{

                return <div className="col-md-4">
                <NewsItem title={ele.title} description={ele.description}  Iurl={ele.urlToImage} />
              </div>
            })}
            
           
         </div>
       
      </div>
    )
  }
}
