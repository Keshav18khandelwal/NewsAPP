import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    let { title, description, imgurl, newsurl, publishedAt, source } = this.props;
    return <>

      <div>

        <div className="card" style={{ width: "18rem" }}>
         
          <img src={imgurl} className="card-img-top" alt="..." />
          
          <div className="card-body">
          <span class="badge rounded-pill bg-dark ">{source.name}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            
            <a href={newsurl} className="btn btn-dark btn-sm" target='_blank'>Read more...</a>
            
            
            
          </div>
          <div class="card-footer text-muted container d-flex justify-content-between">
            {/* {publishedAt.slice(0, 10).concat("    ............Time: ")}
            {publishedAt.slice(12, 19)} */}
            {new Date(publishedAt).toGMTString()}
          </div>
        </div>
      </div>
    </>



  }
}
