import React, { Component } from 'react'

export default class NewsItem extends Component {
  
    render() {
       let {title , description , Iurl} = this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={Iurl} className="card-img-top" alt="No Images"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href="/newsItem" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
