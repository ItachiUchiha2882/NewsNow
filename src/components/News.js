import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>Top headlines</h2>
          <div className='row'>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default News;