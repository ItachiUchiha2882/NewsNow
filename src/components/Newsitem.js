import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    // props with destructuring syntax.
    let {title, description} = this.props;
    return (
      <>
        <div>
          <div className="card" style={{width: '18rem'}}>
            <img src="https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/" className="btn btn-primary">Read more</a>
              </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;